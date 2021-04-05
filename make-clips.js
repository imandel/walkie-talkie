const fs = require('fs');
const tj = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { URL } = require('url');

// set data paths
const CWD = process.cwd();
const CONFIG_PATH = `${CWD}/doc.json`;
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const copy_path = `${CWD}/${CONFIG.google.doc[0].filepath}`
const directory = './data/';
const out = './static/';

const { config: { offset, duration }, chapters } = JSON.parse(fs.readFileSync(`${copy_path}`, 'utf-8'));

let video;
let gps;


const cutVid = (start, clipDuration, outFile) => {
  ffmpeg(video)
    .seek(start)
    .duration(clipDuration)
    .output(outFile)
    .on('end', (err) => {
      if (!err) { console.log(`saved ${outFile}`); }
    })
    .on('error', (err) => {
      console.log('error: ', err);
    })
    .run();
};

const makeImgs = (timestamps, folder) => {
  ffmpeg(video)
    .screenshots({
      timestamps,
      folder,
      filename: '%s.png',
    })
    .on('error', (err) => {
      console.log(err);
    });
};

fs.readdirSync(directory).forEach((file) => {
  if (file.endsWith('.mp4')) {
    video = `${directory}/${file}`;
  } else if (file.endsWith('.gpx')) {
    const gpx = new DOMParser().parseFromString(fs.readFileSync(`${directory}/${file}`, 'utf8'));
    gps = tj.gpx(gpx);
    const start = Date.parse(gps.features[0].properties.time);
    gps.features[0].properties.coordTimes = gps.features[0].properties.coordTimes
      .map((time) => (Date.parse(time) - start) / 1000)
      .filter((time) => time < duration);
    fs.writeFileSync(`./route.json`, JSON.stringify(gps));
  }
});


chapters.forEach((chapter) => {
  if (chapter.video) {
    cutVid(chapter.video.start, chapter.video.duration, `./static/vids/${chapter.id}.mp4`);
  }

});

const chunkArray = (array, size) => {
  const result = [];
  const arrayCopy = [...array];
  while (arrayCopy.length > 0) {
    result.push(arrayCopy.splice(0, size));
  }
  return result;
};

if (!fs.existsSync(`${out}/imgs/`)) {
  fs.mkdirSync(`${out}/imgs/`);
}
console.log('making screenshots, this may take a moment');
chunkArray(gps.features[0].properties.coordTimes, 50).forEach((chunk) => {
  console.log(chunk);
  makeImgs(chunk, `${out}/imgs/`);
});
