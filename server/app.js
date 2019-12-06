const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const http = require('http');

const utils = require('./utils/index');

(async () => {
    let app = express()

    app.set('port', process.env.PORT || 4000)
    app.use( bodyParser.json() )
    app.use(cors())

    // routes
    // get all products
    app.get('/products', async (req, res) => {
        try {
            let products = await utils.getAllProducts()

            res.json(products)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    // get product information
    app.get('/product/:id', async (req, res) => {
        try {
            let id = req.params.id
            let product = await utils.getProduct(id)

            res.json(product)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    // add new product
    app.post('/product/', async (req, res) => {
        try {
            let params = req.params
            let bodyParams = req.body
            let id = params.id
            let data = {}

            // proccess parameters
            data['product_name'] = bodyParams.product_name? bodyParams.product_name: ''
            data['product_desc'] = bodyParams.product_desc? bodyParams.product_desc: ''
            data['product_brand'] = bodyParams.product_brand? bodyParams.product_brand: ''
            data['product_price'] = bodyParams.product_price? bodyParams.product_price: 0
            data['product_status'] = bodyParams.product_status? bodyParams.product_status: ''
            data['product_image'] = bodyParams.product_image? bodyParams.product_image: ''

            let product = await utils.addProduct(data)

            res.json(product)
            res.json({data: 'add product'})
        } catch (e) {
            res.status(500).send(e)
        }
    })

    // modify product
    app.patch('/product/:id', async (req, res) => {
        try {
            let params = req.params
            let bodyParams = req.body
            let id = params.id
            let data = {}

            // proccess parameters
            data['product_name'] = bodyParams.product_name? bodyParams.product_name: ''
            data['product_desc'] = bodyParams.product_desc? bodyParams.product_desc: ''
            data['product_brand'] = bodyParams.product_brand? bodyParams.product_brand: ''
            data['product_price'] = bodyParams.product_price? bodyParams.product_price: 0
            data['product_status'] = bodyParams.product_status? bodyParams.product_status: ''
            data['product_image'] = bodyParams.product_image? bodyParams.product_image: ''

            let product = await utils.updateProduct(id, data)

            res.json(product)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    // remove product
    app.delete('/product/:id', async (req, res) => {
        try {
            let params = req.params
            let id = params.id
            let product = await utils.removeProduct(id)

            res.json(product)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    app.use('/', express.static(path.join(__dirname, '../webapp/build/')))

    http.createServer(app).listen(app.get('port'), () => {
        console.log(`Server Listning on port: ${ app.get('port') }`)
    })
})()