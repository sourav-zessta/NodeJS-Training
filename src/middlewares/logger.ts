import { Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from "path";


export const logger = (req: Request, res: Response, next: NextFunction) => {

    const method = req.method;
    const url = req.url;

    const rootDirectory = path.resolve(__dirname, '../../')
    fs.appendFile(path.join( rootDirectory, 'apiLogs', 'api-log.txt'), `${new Date().toISOString() + ' - ' + method + ' ' + url + '\n'}`, (err) => {
        if (err) {
            res.status(500);
        }
        next();
    })
}

