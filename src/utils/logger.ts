import winston from "winston";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

// Logger for API endpoints
export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.json(),
    }),
    new winston.transports.Http({
      level: "warn",
      format: winston.format.json(),
    }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});
