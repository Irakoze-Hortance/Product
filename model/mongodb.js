const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/product-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log('connected to db successfully'))
.catch(err=>console.log('Failed to connect to mongodb',err))
require('./category.model')
require('./product.model')