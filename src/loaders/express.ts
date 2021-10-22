import express, { Application } from 'express';
import cors from 'cors';
import api from '../routes';

const expressLoader = async (app: Application) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb', strict: false }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/', api);
};

export default expressLoader;
