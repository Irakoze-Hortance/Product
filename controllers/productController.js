const express = require('express')
const mongoose= require('mongoose')
var router = express.Router()
//0783142985
const Product = mongoose.model('Product')
router.post('/',(req,res)=>{
  var product = new Product()
  product.name = req.body.name,
  product.price = req.body.price,
  product.categoryId = req.body.categoryId
  product.save()
   .then(products=>res.send(products).status(201))
   .catch(err=>res.status(400).send(err))
})
router.put('/',(req,res)=>{
    Product.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then(product=>res.send(product))
    .catch(err=>res.send(err).status(400))
})
router.get('/',(req,res)=>{
    Product.find()
    .then(products=>res.send(products))
    .catch(err=>res.send(err).status(404))
})
router.get('/byName/:name',(req,res)=>{
    Product.find({name:req.params.name})
    .then(product=>res.send(product))
    .catch(err=>res.status(404).send(err))
})
router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove({_id:req.params._id})
    .then(product=>res.send(product))
    .catch(err=>res.status(404).send(err))
})

router.get('/byCategory/:categoryId',(req,res)=>{
Product.find({categoryId:req.params.categoryId})
.then(product=>res.send(product))
.catch(err=>res.status(404).send(Error))
})
module.exports=router