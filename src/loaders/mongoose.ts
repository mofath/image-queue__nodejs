import mongoose from 'mongoose';
import config from '../config';
import { logger } from '../lib';

const mongooseLoader = async () => {
  try {
    await mongoose.createConnection(config.MONGODB_URI).asPromise();
  } catch (error: any) {
    logger.error('😱 Failed to load mongoose');
    logger.error(error);
  }
};

export default mongooseLoader;
