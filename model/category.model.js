const mongoose = require('mongoose')
var categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
        min:10,
        required:true
    }
})
mongoose.model('Category',categorySchema)