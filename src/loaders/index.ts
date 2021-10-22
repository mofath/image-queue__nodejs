import mongooseLoader from './mongoose';
import { Application } from 'express';
import iocContainerLoader from './iocContainer';
import { logger } from '../lib';
import expressLoader from './express';

const loader = async (app: Application) => {
  try {
    expressLoader(app);

    await mongooseLoader();
    logger.info(`🛸️ MongoDB loaded successfully`);

    await iocContainerLoader();
    logger.info(`🚀 Dependency Injector loaded successfully`);

    logger.info('💯 Express loaded successfully');
  } catch (error: any) {
    logger.error(error.message);
    logger.error(error);
  }
};

export default loader;
