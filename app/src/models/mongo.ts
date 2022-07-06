import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    foto: {type: String, required: true, max: 100},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true }
},{
    versionKey: false
})  

const CartSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    products:[
    //     {
    // // timestamp: {type: Date, required: true, max: 100},
    // // nombre: {type: String, required: true, max: 100},
    // // descripcion: {type: String, required: true, max: 100},
    // // codigo: {type: String, required: true, max: 100},
    // // foto: {type: String, required: true, max: 100},
    // // timestamp: {type: String, required: true, max: 100},
    // // precio: {type: Number, required: true},
    // // stock: {type: Number, required: true }}
]
},{
    versionKey: false
})  



export const mongoProducts = mongoose.model('products', ProductsSchema);
export const mongoCart = mongoose.model('cart', CartSchema);





