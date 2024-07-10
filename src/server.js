import express from "express";
import { productsRouter } from "../routers/productsRouter.js";
import {cartsRouter} from "../routers/cartsRouter.js"


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter)

app.listen(PORT, () => { console.log(`server running on PORT: ${PORT}`) })