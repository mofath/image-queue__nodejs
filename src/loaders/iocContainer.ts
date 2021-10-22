import { Container } from 'typedi';
import { logger } from '../lib';

const iocContainerLoader = async () => {
  try {
    Container.set('logger', logger);
  } catch (error: any) {
    logger.error('😱 Failed to load dependency injector: ', error.message);
    logger.error(error);
  }
};

export default iocContainerLoader;
