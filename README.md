## Walkie Talkie
This template is an extension of the Mapbox "scrollytelling" template and is meant for data journalists and digital storytellers of any kind.

<!--Full instructions on use can be found [here](http://formerspatial.com/scrolly-drive).-->

## Prerequisites
Please familiarize yourself with Mapbox's template documentation [here](https://github.com/mapbox/storytelling).

## To Run
uses parcel bundler
* clone repo
* `npm install`
* for dev `parcel index.html`

## Making a Walkie Talkie

1. Create Copy JSON (Slides Content)
* Create Google Doc by making a copy of [this document](https://docs.google.com/document/d/1RyXl-0C_0-Ko-Gklx1Jd1q7MA6vVFiRPJJkmsPJ4PHo/edit) and updating the text and parameters
* Make sure config
* Fill in `id` and `filepath` parameters in `doc.json`(id: the Google Doc document ID between "d/" and "/edit" in the link, filepath: path for your copy content)
* Run `npm run doc` to execute `fetch-doc.js` which will pull Google Doc content into your copy filepath

2. Prepare Video Content
* Add .mp4 video file to `data/` and `dist/` folders (note: only mp4 will work. If you have another format, use ffmpeg to convert)
* Make sure image file path is corre

3. Prepare GPS Route Content
* Add GPX file to `data/` folder

4. Create Image Flipbook Content and Routes JSON
* After video and GPs data are ready, run `node make-clips.js`
* This will create `routes.json` for the walking point/line and image clips in the `imgs` folder for the flipbook

5. Run project

