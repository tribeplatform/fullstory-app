import { LOG_FORMAT, LOGGER_PRETTY_PRINT, NODE_ENV } from '@config';
import { Logger, LoggerLevel } from '@tribeplatform/node-logger';


const createLogger = (context: string = 'Global'): Logger => new Logger({
  pretty: LOGGER_PRETTY_PRINT ? LOGGER_PRETTY_PRINT === 'true' : NODE_ENV === 'production' ? false : true,
  level: (LOG_FORMAT as LoggerLevel) || 'info',
  context,
});

const logger = createLogger('Global')

export { logger, createLogger };
