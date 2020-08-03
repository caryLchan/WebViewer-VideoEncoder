const express = require('express');
import { Response, Request } from 'express';
const getPlaylist = require('../controllers/getPlaylistController');
const getVideo = require('../controllers/getVideoController');
const videoEncode = require('../controllers/videoEncodeController');

const router = express.Router();

router.post('/upload', videoEncode, (req: Request, res: Response) => {
  res.status(200).json(res.locals.video);
});

router.get('/watch/:id', getVideo, (req: Request, res: Response) => {
  res.status(200).json(res.locals.video);
});

router.get('/watch', getPlaylist, (req: Request, res: Response) => {
  res.status(200).json(res.locals.playlist);
});

module.exports = router;