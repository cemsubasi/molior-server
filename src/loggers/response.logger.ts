import winston from 'winston';
const { timestamp, combine, json } = winston.format;

const jsonWithTimestamp = combine(timestamp(), json());

const logger = (type: string) => {
  const transports =
    process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: `src/logs/${type}/response/error.log`,
            level: 'error',
          }),
          new winston.transports.File({
            filename: `src/logs/${type}/response/combined.log`,
          }),
        ]
      : [
          new winston.transports.Console({
            format: winston.format.splat(),
          }),
        ];

  return winston.createLogger({
    level: 'info',
    format: jsonWithTimestamp,
    defaultMeta: { service: `${type}-response-service` },
    transports: <any>transports,
  });
};

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

export default logger;
