// Number of slides that will drive (more = smoother)
// If this doesn't match the number of slides named 'drive-slide' in config below you will not complete the full journey
import * as copy from './copy.json';
// cpoy is generated at https://docs.google.com/document/d/1JTcLYprBrUNbBsdKwp2SfQHVSerT7PKxNxFsIGTIK7M/edit
const driveSlides = 9;

// Number of points on drive route (more = higher quality, but slower to process)
const driveSmoothness = 100;

// Value used to drive
const driveTime = driveSlides * driveSmoothness;

// Do you want to follow the point? True = follow
const followPoint = false;

// ...If so, what zoom, pitch, and bearing should be used to follow?
const followZoomLevel = 12;
const followBearing = 29;
const followPitch = 0;
const offset = -93;

// to add 'driving' slides just make sure to add 'drive to beginning of slide id'
// you also need to add a running total to the end of each 'drive-slide', (ex. drive-slide-0, drive-slide-1, drive-slide-2, etc.)
const config = {
  style: 'mapbox://styles/imandel/ckkrshfj10inj17mr95a9d0dr',
  accessToken: 'pk.eyJ1IjoiaW1hbmRlbCIsImEiOiJjankxdjU4ODMwYTViM21teGFpenpsbmd1In0.IN9K9rp8-I5pTbYTmwRJ4Q',
  showMarkers: false,
  theme: 'dark',
  alignment: 'left',
  title: 'Social Distancing in New York City',
  subtitle: 'A layered approach to visual urban analysis',
  byline: 'By Ilan Mandel',
  footer: 'Data Sources: NYC DOT, Nexar, Mapillary',
  // chapters: copy.chapters
};

export {
  config,
  driveSlides,
  driveSmoothness,
  // driveTime,
  // followPoint,
  // followZoomLevel,
  // followBearing,
  // followPitch,
  // offset
};
