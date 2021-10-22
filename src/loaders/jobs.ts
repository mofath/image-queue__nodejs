import config from '../config';
import { Agenda } from 'agenda';

const jobsLoader = (agenda: Agenda) => {
  agenda.define('send-email', {
    priority: 'high' as any,
    concurrency: config.AGENDA.CONCURRENCY,
  });

  agenda.start();
};

export default jobsLoader;
