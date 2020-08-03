import { IVideo, MidFunc } from '../types';

const db = require('../models/videoModels');

const getVideo: MidFunc = async (req, res, next) => {
  try {
    const { id } = req.params
    const video = await db.query('SELECT * FROM playlist WHERE id = $1', [id]);
    const videoArr: [string[]?] = []
    await video.rows.forEach((el:IVideo) => {
      videoArr.push([el.title, el.path4k, el.path1080, el.path480, el.path240])
    })
    res.locals.video = videoArr[0];
    
    return next();
  } catch (error) {
    console.error('getVideoController/getVideo error: ', error);
  }
};

module.exports = getVideo;