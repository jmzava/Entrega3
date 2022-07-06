import { Router } from "express"
import cartController from "../controllers/cartController"

const routes = Router()

routes.get('/', cartController.listCarts)
routes.post('/', cartController.saveCarts)
routes.get('/:idCart', cartController.getById )
routes.delete('/:idCart', cartController.deleteCart)
routes.post('/:id/productos/:idProduct', cartController.addProdToCart)
routes.get('/:idCart/Comprar', cartController.buyCart)

export default routes


