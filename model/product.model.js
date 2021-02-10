const mongoose = require('mongoose')
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required: true
    },
    categoryId:{
        type:Number,
        required: true
    }
})
mongoose.model('Product',productSchema)