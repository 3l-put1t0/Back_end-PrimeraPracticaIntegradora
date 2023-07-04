import { Router } from "express";

import { messageModel } from "../DAO/managerDB/models/message.model.js";

const router = Router();


router.route('/chat')
.get(async (req, res) =>{
    const data = await messageModel.find();
    res.status(201).render('chat', {});
});

router.post('/chat', async (req, res) =>{
    const { user } = req.body;
    if (!products) return res.status(401).json({message: "error", result: `CANNOT CREATE CART`});
    const cart = { products };
    // controlFileManager_Product.createProduct(product);
    await messageModel.insertMany(cart);
    res.status(201).json({message: "success", result: "CREATE chat ON DB"});
});

router.route('/chat/:cid')
.delete(async (req, res) => {
    const { cid } = req.params;
    await messageModel.deleteOne({_id: `${cid}`});
    res.status(201).json({message: "success", result: `DELETE CART`});
})
.put(async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = { products };
    await messageModel.updateOne({_id: `${cid}`}, {$set: cart});
    // controlFileManager_Product.updatechat(product);
    res.status(201).json({message: "success", result: `UPDATE CART`});
});

export default router;