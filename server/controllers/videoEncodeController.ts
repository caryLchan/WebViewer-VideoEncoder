import { IVideo, MidFunc } from '../types';
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')

const db = require('../models/videoModels');

const videoEncode: MidFunc = async (req, res, next) => {
  try {
    const { title, pathToFile } = req.body;

    let index = 0;
    for(let i = 0; i < pathToFile.length; i++) {
      if (pathToFile[i] === '/') index = i
    }
    const pathToVideo = pathToFile.slice(0, index+1)
    const videoFile = pathToFile.slice(index+1, pathToFile.length)

    const video = await db.query('INSERT INTO playlist (title, path4k, path1080, path480, path240) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, `video/${title}4k.mp4`, `video/${title}1080.mp4`, `video/${title}480.mp4`, `video/${title}240.mp4`]);

    const videoArr: [string[]?] = [];

    await video.rows.forEach((el:IVideo) => {
      videoArr.push([el.title, el.path4k, el.path1080, el.path480, el.path240])
    });

    res.locals.video = videoArr[0];

    const command240 = ffmpeg(path.resolve(__dirname, `${pathToVideo}`, `${videoFile}`))
      .videoCodec('libx264')
      .size('320x240')
      .save(path.resolve(__dirname, '../../public/video/', `${title}240.mp4`));
      
    const command480 = ffmpeg(path.resolve(__dirname, `${pathToVideo}`, `${videoFile}`))
      .videoCodec('libx264')
      .size('640x480')
      .save(path.resolve(__dirname, '../../public/video/', `${title}480.mp4`));

    const command1080 = ffmpeg(path.resolve(__dirname, `${pathToVideo}`, `${videoFile}`))
      .videoCodec('libx264')
      .size('1920x1080')
      .save(path.resolve(__dirname, '../../public/video/', `${title}1080.mp4`));
      
    const command4k = ffmpeg(path.resolve(__dirname, `${pathToVideo}`, `${videoFile}`))
      .videoCodec('libx264')
      .size('3840x2160')
      .save(path.resolve(__dirname, '../../public/video/', `${title}4k.mp4`));

    return next();
  } catch (error) {
    console.error('videoEncodeController/videoEncode error: ', error);
  }
};

module.exports = videoEncode;