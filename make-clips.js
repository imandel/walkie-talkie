const directory = './data';
const out = './static';
const fs = require('fs');
const tj = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');
const ffmpeg = require('fluent-ffmpeg');
const { URL } = require('url');

const { config: { offset, duration }, chapters } = JSON.parse(fs.readFileSync('./copy.json', 'utf-8'));
const CWD = process.cwd();

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
  // if(chapter.image) {
  //   if
  // }
});

// download img urls?
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
  console.log('making screenshots, this may take a moment');
  chunkArray(gps.features[0].properties.coordTimes, 50).forEach((chunk) => {
    console.log(chunk);
    makeImgs(chunk, `${out}/imgs/`);
  });
}
