import {Router} from "express"
import cartsManager from "../managers/cartsManager.js"

export const cartsRouter = Router()
const Manager = new cartsManager('./data/Carts.json')

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const respuesta = await Manager.addToCart(cid, pid)
        res.json(respuesta)

    } catch (error) {
        console.log(error)
        res.send('Los datos ingresados son incorrectos')
    }

})

cartsRouter.post('/', async (req, res) => {
    const respuesta = await Manager.addcart()
    res.json(respuesta)
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        let respuesta = await Manager.getcartById(cartId)
        res.json(respuesta)
    } catch (error) {
        console.log(error)
        res.send('Los datos ingresados son incorrectos')
    }
})