import { Router } from "express"
import ProductsManager from "../managers/productsManager.js"

export const productsRouter = Router()
const manager = new ProductsManager('./data/Products.json')

productsRouter.get('/', async (req, res) => { 
    const limit = req.query.limit
    if (!limit) return res.send(await manager.getProducts())
    let respuesta = await manager.getProducts()
    respuesta = respuesta.slice(0, parseInt(limit))
    return res.json(respuesta)
})

productsRouter.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)
    const respuesta = await manager.getProductById(productId)
    return res.json(respuesta)
})

productsRouter.post('/', async (req, res) => {
    try {
        const producto = req.body
        const respuesta = await manager.addProduct(producto)
        res.send(respuesta)
    } catch (error) {
        return console.log(error)
    }
})

productsRouter.put('/:pid', async (req, res) => { // no funciona para actualizar el status (se puede cambiar el status de false a tru pero alrreves no
    try {
        const { pid } = req.params
        const producto = req.body
        const respuesta = await manager.updateProduct(parseInt(pid), producto)
        res.json(respuesta)
    } catch (error) {
        console.log(error)
        res.send('el producto no existe')
    }
})
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const respuesta = await manager.deleteProduct(parseInt(pid))
        res.send(JSON.stringify(respuesta))

    } catch (error) {
        return console.log(error)

    }

})