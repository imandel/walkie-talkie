## Walkie Talkie
This template is an extension of the Mapbox "scrollytelling" template and is meant for data journalists and digital storytellers of any kind.

<!--Full instructions on use can be found [here](http://formerspatial.com/scrolly-drive).-->

## Prerequisites
Please familiarize yourself with Mapbox's template documentation [here](https://github.com/mapbox/storytelling).

## To Run
* `npm install -g parcel-bundler` from
https://parceljs.org/getting_started.html
* clone repo
* `npm install` (`npm audit fix` if needed)
* for dev `parcel index.html`

## Making a Walkie Talkie

### To build your own walkie talkie, content-wise you will need:
* an interview video (mp4), used in step 2
* GPS route recording (gpx), used in step 3
* written description blocks to present (google doc), used in step 1
* some map layers to focus and discuss upon (if needed), used in step 1, e.g. [.onChapterEnter] layer: park-slope opacity: 1


### Steps

1. Create Copy JSON (Slide Show Presentation Content)
* Create Google Doc by making a copy of [this document](https://docs.google.com/document/d/1RyXl-0C_0-Ko-Gklx1Jd1q7MA6vVFiRPJJkmsPJ4PHo/edit) and updating the text and parameters
* Make sure that the configs in the document are correct
* Fill in `id` and `filepath` parameters in `doc.json`(id: the Google Doc document ID between "d/" and "/edit" in the link, filepath: path for your destination copy content; and make sure the doc is shared publicly)
* Run `npm run doc` to execute `fetch-doc.js` which will pull Google Doc content into your copy filepath

2. Prepare Video Content
* Add .mp4 video file to `data/` and `dist/` folders (note: only mp4 will work. If you have another format, use ffmpeg to convert)
* Make sure image file path is correct

3. Prepare GPS Route Content
* Add GPX file to `data/` folder

4. Create Image Flipbook Content and Routes JSON
* After video and GPs data are ready, run `node make-clips.js`
* This will create `routes.json` for the walking point/line and image clips in the `imgs` folder for the flipbook

5. Update path names in `index.js`
* Make sure that the copy path (ex. import { chapters, config } from `copy.json`) and video path (ex. vid.src = `./IMG_1234.mp4`) match your data

6. Run project `npm run dev`

