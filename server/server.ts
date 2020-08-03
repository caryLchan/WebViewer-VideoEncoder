const express = require('express');
const api = require('./routes/api');
import {Request, Response, NextFunction, Errback} from 'express';
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', api);

app.use('*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({msg: err});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});