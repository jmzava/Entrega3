import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './build/public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname }`)
    }
});

export const upload = multer({storage: storage});

export const uploadFile =  (req: Request, res: Response, next: NextFunction) => {
    const file = req.file
    if (!file) {

        const err = new Error('Favor agregar archivo');
        return next(err);
    } else {

        res.status(200).json({msg:'Archivo subido satisfactoriamente'});   
    }
}
  