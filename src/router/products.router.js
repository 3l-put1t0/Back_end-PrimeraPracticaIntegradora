import { Router } from "express";

import ControlFileManager from "../DAO/managerFileSystem/controlFileManager.js";
import { productModel } from "../DAO/managerDB/models/product.model.js";

const router = Router();

const FILE_NAME_PRODUCTS = "products.json"
const PATH = "./FILES";

const controlFileManager_Product = new ControlFileManager(FILE_NAME_PRODUCTS, PATH);

router.route('/productsFS')
.get((req, res) =>{
    const data = controlFileManager_Product.getProducts();
    res.status(201).json({message: "success", result: data});
});

router.route('/products')
.get(async (req, res) =>{
    const data = await productModel.find();
    res.status(201).json({message: "success", result: data});
});

router.post('/products', async (req, res) =>{
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) return res.status(401).json({message: "error", result: `CANNOT CREATE PRODUCT`});
    const product = { title, description, code, price, status, stock, category, thumbnails };
    controlFileManager_Product.createProduct(product);
    await productModel.insertMany(product);
    res.status(201).json({message: "success", result: "CREATE PRODUCT ON DB AND IN FILE"});
});

router.route('/products/:pid')
.delete(async (req, res) => {
    const { pid } = req.params;
    // controlFileManager_Product.deleteProducts(pid);
    await productModel.deleteOne({_id: `${pid}`});
    res.status(201).json({message: "success", result: `DELETE PRODUCT`});
})
.put(async (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const product = { title, description, code, price, status, stock, category, thumbnails };
    await productModel.updateOne({_id: `${pid}`}, {$set: product});
    // controlFileManager_Product.updateProducts(product);
    res.status(201).json({message: "success", result: `UPDATE PRODUCT`});
});

router.post('/productsFS/writeFile', (req, res) =>{
    const { write } = req.body;
    if (!write) return res.status(401).json({message: "error", result: `CANNOT WRITE FILE: ${FILE_NAME_PRODUCTS}`});
    controlFileManager_Product.rewriteFileProducts(write);
    res.status(201).json({message: "success", result: `CAN WRITE FILE: ${FILE_NAME_PRODUCTS}`});
});



export default router;