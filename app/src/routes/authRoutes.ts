import { Router, Request, Response  } from "express";
import passport from 'passport';
import '../middlewares/passport';
import { upload } from "../middlewares/multer"

const routes = Router();

routes.post('/register', upload.single('miArchivo'), passport.authenticate('local-signup', {
    successRedirect: '/products',
    failureRedirect: '/signUpError',
    passReqToCallback: true,
    failureMessage: true 
})) 

routes.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/products',
    failureRedirect: '/signInError',
    passReqToCallback: true,
    failureMessage: true
}))



export default routes