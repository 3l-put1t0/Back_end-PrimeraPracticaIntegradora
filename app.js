import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";


import __dirname from "./src/utils.js";
import productRouter from "./src/router/products.router.js";
import cartsRouter from "./src/router/carts.router.js";
import viewRouter from "./src/router/view.router.js";
import { messageModel } from "./src/DAO/managerDB/models/message.model.js";

const app = express();

const PORT = 8080;

const PASSWORD = 'mongoDB$123';
const DB = 'ecommerce';
const __URL = `mongodb+srv://Secas:${PASSWORD}@cluster0.wbsfiqg.mongodb.net/${DB}?retryWrites=true&w=majority`;

try{
    mongoose.connect(__URL);
}catch(e){
    console.log(`ERROR CONNECT MONGO-DB: ${e}`);
}

// MIDDLEWAREs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api', productRouter);
app.use('/api', cartsRouter);
app.use('/api', viewRouter);

const server = app.listen(PORT, console.log(`LISTENING PORT: ${PORT}`));

const io = new Server(server);

let messages = [];
let count_cliente = 0;

async function findMessages(){
    const data = await messageModel.find().lean();
    io.emit('messageLogs', data); 
}

async function deleteMessageAll(count){
    if (count == 0){
        await messageModel.deleteMany();
    }
}

io.on('connection', socket =>{
    console.log('CLIENT CONNECTED');
    deleteMessageAll(count_cliente); 
    count_cliente = count_cliente+1;
    
    socket.on('message', async data => {
        await messageModel.insertMany(data);
        findMessages();
    });
});
