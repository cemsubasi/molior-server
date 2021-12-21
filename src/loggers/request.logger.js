const winston = require('winston');
const { timestamp, combine, json } = winston.format;

const jsonWithTimestamp = combine(timestamp(), json());

const logger = (type) =>
  winston.createLogger({
    level: 'info',
    format: jsonWithTimestamp,
    defaultMeta: { service: `${type}-request-service` },
    transports: [
      new winston.transports.File({
        filename: `logs/${type}/request/combined.log`,
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
