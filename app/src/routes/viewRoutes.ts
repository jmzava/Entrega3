import { Router } from "express"
import { isAuth } from '../middlewares/authCheck'
import viewsController from '../controllers/viewsController'
import { uploadFile, upload } from "../middlewares/multer"

const routes = Router()

routes.get('/', viewsController.login)
routes.get('/signInError', viewsController.loginError)
routes.get('/signUpError', viewsController.signupError)
routes.get('/signUpOk', viewsController.signupOk)
routes.get('/logout', viewsController.logout)

routes.get('/products', isAuth, viewsController.productsView )

routes.get('/form', (req:any, res:any)=> res.render('login/formulario'))
routes.post('/guardar',upload.single('miArchivo'), uploadFile )


export default routes