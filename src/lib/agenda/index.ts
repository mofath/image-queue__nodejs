import Agenda from 'agenda';
import config from '../../config';

const agendaFactory = ({ mongoConn }) => {
  return new Agenda({
    mongo: mongoConn,
    processEvery: config.AGENDA.POOLTIME,
    maxConcurrency: config.AGENDA.CONCURRENCY,
  });
};

export default agendaFactory;
