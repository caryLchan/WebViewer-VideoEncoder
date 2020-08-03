import { MidFunc, IPlaylist } from '../types';

const db = require('../models/videoModels');

const getPlaylist: MidFunc = async (req, res, next) => {
  try {
    const playlist = await db.query('SELECT * FROM playlist ORDER BY id ASC');
    const playlistArr: [string[]?] = []
    await playlist.rows.forEach((el:IPlaylist) => {
      playlistArr.push([`${el.id}`, el.title])
    })
    res.locals.playlist = playlistArr;
    
    return next();
  } catch (error) {
    console.error('getPlaylistController/getPlaylist error: ', error);
  }
};

module.exports = getPlaylist;