import { Request, Response, NextFunction } from 'express';

export interface IVideo {
  id: number
  title: string
  path4k: string
  path1080: string
  path480: string
  path240: string
};

export interface IPlaylist {
  id: string
  title: string
};

export type MidFunc = (req: Request, res: Response, next: NextFunction) => void;