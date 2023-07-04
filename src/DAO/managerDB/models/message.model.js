import mongoose from "mongoose";

const messageCollection = "message";

const messageSchema = new mongoose.Schema({
    user: {type: String, require: true},
    message: String
});

export const messageModel = mongoose.model(messageCollection, messageSchema);