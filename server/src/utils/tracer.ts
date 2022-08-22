import DDTrace from 'dd-trace'

import { logger } from '@utils/logger'

/**
 * CAUTION: Not wrapping the tracer initialization in this
 * block will cause unexpected failures in some tests as they
 * currently produce logs and exceptional side-effects.
 */
if (process.env.NODE_ENV !== 'test') {
  // Initialized in a different file to avoid hoisting.
  DDTrace.init({
    logInjection: true,
    startupLogs: true,
    sampleRate: 1,
    logger: {
      error: err => logger.error(err, { context: 'DDTracer' }),
      warn: message => logger.warn(message, { context: 'DDTracer' }),
      info: message => logger.log(message, { context: 'DDTracer' }),
      debug: message => logger.debug(message, { context: 'DDTracer' }),
    },
  })
  DDTrace.use('express', {
    // hook will be executed right before the request span is finished
    hooks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      request: (span, req, res) => {
        // span.setTag('member.id', req['user']?.id)
        // span.setTag('member.networkId', req['user']?.networkId)
        // span.setTag('member.networkDomain', req['user']?.networkDomain)
      },
    },
  })
}

export const tracer = DDTrace
