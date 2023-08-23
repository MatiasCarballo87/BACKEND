import winston from "winston";


export const loggerDev = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.colorize({ all: true }),
        })
    ]
});


export const loggerProd = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "./errors.log",
            level: "info",
            format: winston.format.simple(),
        })
    ]
});