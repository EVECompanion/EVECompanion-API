import { PathLike } from "fs";
import logService from "./services/logger";

const logger = logService(module);

// Check if all of the required environment variables are set.
// Stop process if one of those required values is not set.
const requiredVariables: string[] = [
    "DATA_DIR",
    "DATA_DIR_V2"
];

for (const requiredVariable of requiredVariables) {
    if(process.env[requiredVariable] == null) {
        logger.error(`Required environment variable ${requiredVariable} is not set.`);
        process.exit(1);
    }
}

export default {
    dataDir: process.env.DATA_DIR as PathLike,
    dataDirV2: process.env.DATA_DIR_V2 as PathLike,
    port: parseInt(process.env.API_PORT ?? "") || 8080,
};