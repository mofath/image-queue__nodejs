import { Container } from 'typedi';
import { logger, agendaFactory } from '../lib';

const iocContainerLoader = async ({ mongoConn }) => {
  try {
    const agendaInstance = agendaFactory({ mongoConn });

    Container.set('logger', logger);
    Container.set('agendaInstance', agendaInstance);

    return agendaInstance;
  } catch (error: any) {
    logger.error('😱 Failed to load dependency injector: ', error.message);
    logger.error(error);
  }
};

export default iocContainerLoader;
