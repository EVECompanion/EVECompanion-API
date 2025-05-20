import { Request, Response } from "express";
import logService from "../../services/logger";
import path from "path";
import fs from "fs";
import config from "../../config";

const logger = logService(module);

type SDEFile = {
    version: number;
    filePath: string;
}

export default class V1Controller {

    constructor() { }

    getVersion = async (request: Request, response: Response) => {
        this.getCurrentSDEFile().then((file) => {
            if(!file) {
                response.sendStatus(404);
                return;
            }

            response.send({version: file.version});
        }).catch((err) => {
            logger.error(`Error while getting current SDE File: ${err}`);
            response.sendStatus(500);
        });
    };

    downloadSDE = async (request: Request, response: Response) => {
        this.getCurrentSDEFile().then((file) => {
            if(!file) {
                response.sendStatus(404);
                return;
            }

            response.download(file.filePath, `${file.version}.sqlite`);
        }).catch((err) => {
            logger.error(`Error while getting current SDE File: ${err}`);
            response.sendStatus(500);
        });
    };

    listSDEFiles(): Promise<SDEFile[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(config.dataDir, (err, files) => {
                if(err) {
                    logger.error(`Error while reading sde data dir: ${err}`);
                    reject(err);
                    return;
                }
            
                const filteredFiles = files.filter((file) => {
                    const fileRegex = new RegExp(/^\d*[.]sqlite$/);
                    return fileRegex.test(file);
                });
    
                const optionalSDEFiles: Array<SDEFile | null> = filteredFiles.map((file): SDEFile | null => {
                    const versionString: string | undefined = file.match(/\d+/)?.[0];
    
                    if(!versionString) {
                        return null;
                    }
    
                    const version: number | null = +versionString;
    
                    if(!version) {
                        return null;
                    }
    
                    return {
                        version: version,
                        filePath: path.join(config.dataDir.toString(), file)
                    };
                });
    
                let sdeFiles: SDEFile[] = optionalSDEFiles.filter(this.notEmptyFilter);
            
                sdeFiles = sdeFiles.toSorted((lhs, rhs) => {
                    return lhs.version - rhs.version;
                });
            
                resolve(sdeFiles);
            });
        });
    }
    
    notEmptyFilter<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && value !== undefined;
    }
    
    getCurrentSDEFile(): Promise<SDEFile | null> {
        return new Promise((resolve, reject) => {
            this.listSDEFiles().then((files) => {
                if(files.length < 1) {
                    resolve(null);
                    return;
                }
    
                resolve(files[files.length - 1]);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}