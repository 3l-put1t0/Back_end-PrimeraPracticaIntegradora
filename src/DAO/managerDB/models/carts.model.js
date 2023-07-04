import mongoose, { Schema } from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: Array
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);