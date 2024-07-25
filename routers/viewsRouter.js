import { Router } from "express"
import ProductsManager from "../managers/productsManager.js"

export const viewsRouter = Router()
const manager = new ProductsManager('./data/Products.json')

viewsRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {
        title: 'REAL TIME PRODUCT',
        labelTitle: 'Productos en tiempo real'
    })
})

viewsRouter.get("/", async (req, res) => {

    const productos = await manager.getProducts()

    res.render('home', {
        title: 'HOME',
        labelTitle: 'Productos',
        hayProductos: productos.length > 0,
        productos,
    })
})