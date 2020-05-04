import winston from 'winston';
import env from './env';

env.restrictToServer();

const myLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

winston.remove(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

winston.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
  { colorize: true },
);

export default winston;
