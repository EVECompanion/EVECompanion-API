import winston from "winston";
import path from "path";

export default function logger(foreignModule: NodeModule): winston.Logger {
    let label;
    if (require.main) {
        label = path.relative(path.dirname(require.main.filename), foreignModule.filename);
    } else {
        label = foreignModule.filename;
    }
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.label({ label }),
            winston.format.printf(info => `${info.timestamp} ${info.label} [${info.level}]: ${info.message}`)
        ),
        transports: [new winston.transports.Console({ level: "silly" })]
    });
}