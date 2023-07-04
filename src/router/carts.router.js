import { Router } from "express";

import { cartsModel } from "../DAO/managerDB/models/carts.model.js";

const router = Router();


router.route('/carts')
.get(async (req, res) =>{
    const data = await cartsModel.find();
    res.status(201).json({message: "success", result: data});
});

router.post('/carts', async (req, res) =>{
    const { products } = req.body;
    if (!products) return res.status(401).json({message: "error", result: `CANNOT CREATE CART`});
    const cart = { products };
    // controlFileManager_Product.createProduct(product);
    await cartsModel.insertMany(cart);
    res.status(201).json({message: "success", result: "CREATE CARTS ON DB"});
});

router.route('/carts/:cid')
.delete(async (req, res) => {
    const { cid } = req.params;
    await cartsModel.deleteOne({_id: `${cid}`});
    res.status(201).json({message: "success", result: `DELETE CART`});
})
.put(async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = { products };
    await cartsModel.updateOne({_id: `${cid}`}, {$set: cart});
    // controlFileManager_Product.updatecarts(product);
    res.status(201).json({message: "success", result: `UPDATE CART`});
});

export default router;