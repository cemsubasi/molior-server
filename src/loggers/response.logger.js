const winston = require('winston');
const { timestamp, combine, json } = winston.format;

const jsonWithTimestamp = combine(timestamp(), json());

const logger = (type) =>
  winston.createLogger({
    level: 'info',
    format: jsonWithTimestamp,
    defaultMeta: { service: `${type}-response-service` },
    transports: [
      new winston.transports.File({
        filename: `logs/${type}/response/error.log`,
        level: 'error',
      }),
      new winston.transports.File({
        filename: `logs/${type}/response/combined.log`,
      }),
    ],
  });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

module.exports = logger;
