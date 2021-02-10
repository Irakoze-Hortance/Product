const express=require('express')
const mongoose = require('mongoose')
var router = express.Router()

const Category = mongoose.model('Category')
    router.post('/',(req,res)=>{
        var category = new Category()
        category.name = req.body.name,
        category.description = req.body.description
        category.save()
          .then(category=>res.send(category).status(201))
          .catch(err=>res.send(err).status(400))
    })
    router.put('/:id',(req,res)=>{
        Category.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
         .then(category=>res.send(category))
         .catch(err=>res.send(err).status(400))
    })
    router.get('/',(req,res)=>{
        Category.find()
        .then(category=>res.send(category))
        .catch(err=>res.send(err).status(404))
    })
    router.get('/byname/:name',(req,res)=>{
        Category.find({name:req.params.name})
        .then(category=>res.send(category))
        .catch(err=>res.send(err).status(404))
    })
    router.delete('/:id',(req,res)=>{
        Category.findOneAndRemove({_id:req.params._id})
        .then(category=>res.send(category))
        .catch(err=>res.send(err).status(404))
    })

    router.get('/:id',(req,res)=>{
        Category.findOne({_id:req.params.id})
        .then(category =>res.send(category))
        .catch(err =>res.send(err).status(404))
    })
module.exports=router