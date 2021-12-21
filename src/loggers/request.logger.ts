import winston from 'winston';
const { timestamp, combine, json } = winston.format;

const jsonWithTimestamp = combine(timestamp(), json());

const logger = (type: string) =>
  winston.createLogger({
    level: 'info',
    format: jsonWithTimestamp,
    defaultMeta: { service: `${type}-request-service` },
    transports: [
      new winston.transports.File({
        filename: `src/logs/${type}/request/combined.log`,
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

export default logger;