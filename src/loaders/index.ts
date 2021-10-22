import mongooseLoader from './mongoose';
import { Application } from 'express';
import iocContainerLoader from './iocContainer';
import { logger } from '../lib';
import expressLoader from './express';
import jobsLoader from './jobs';
import { Agenda } from 'agenda';

const loader = async (app: Application) => {
  try {
    expressLoader(app);
    logger.info('💯 Express loaded successfully');

    const mongoConn = await mongooseLoader();
    logger.info(`🛸️ MongoDB loaded successfully`);

    const agenda = await iocContainerLoader({ mongoConn });
    logger.info(`🚀 Dependency Injector loaded successfully`);

    await jobsLoader(agenda as Agenda);
    logger.info('✌️ Jobs loaded');
  } catch (error: any) {
    logger.error(error.message);
    logger.error(error);
  }
};

export default loader;
