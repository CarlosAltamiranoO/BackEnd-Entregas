import { Router } from "express"
/* import ProductsManager from "../managers/productsManager.js" */
import { ProductsManager} from '../managers/productsManagerMongo.js'

export const viewsRouter = Router()
const manager = new ProductsManager('./data/Products.json')

viewsRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {
        title: 'REAL TIME PRODUCT',
        labelTitle: 'Productos en tiempo real'
    })
})

/* viewsRouter.get("/", async (req, res) => {

    const productos = await manager.getProducts()

    res.render('home', {
        title: 'HOME',
        labelTitle: 'Productos',
        hayProductos: productos.length > 0,
        productos,
    })
}) */
viewsRouter.get('/', async (req, res) => {
    
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const params = { limit, page }
    const sort = req.query.sort
    let query = ""
    if (req.query.sort) { params.sort = { price: parseInt(sort) } }
    if (req.query.query) { query = { category: req.query.query } }
    const productos = await manager.getProducts({ params, query })
    /* ver como usar lo de nexlink */
    const url = 'http://localhost:8080/'
    productos.prevLink = productos.hasPrevPage?`${url}?page=${productos.prevPage}` : '';
    productos.nextLink = productos.hasNextPage?`${url}?page=${productos.nextPage}` : '';
    productos.isValid = !(page <= 0 || page >= productos.totalPages)
    /* ver como usar lo de nexlink */
    //console.log("productos: ", productos)
    res.render('home', {
        title: "HOME",
        hayProductos: productos.docs.length > 0,
        productos,
    })
})