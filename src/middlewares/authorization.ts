import { Request, Response, NextFunction } from 'express';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header('Authorization');
    token = token?.split(' ')[1];
    if(token){
        next();
    } else {
        res.json({message: 'error'})
    }
}