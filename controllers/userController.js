//Import the dependencies
const hashPassword = require('../utils/hash')
const _= require('lodash')
const express = require('express');
const {User,validate} =  require('../model/user.model')
//Creating a Router
var router = express.Router();
 
//get users
router.get('/',async (req,res)=>{
    const users = await User.find().sort({name:1});

    return res.send(users)
});
router.get('/:email',async (req,res)=>{
    const users = await User.find({email: req.params.email});
    return res.send(users)
});
router.put('api/:id',(req,res)=>{
    user.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then(user=>res.send(user))
    .catch(err=>res.send(err).status(400))
})
router.get('/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
    .then(users =>res.send(users))
    .catch(err =>res.send(err).status(404))
})
router.post('/admin/:isAdmin',async (req,res) =>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let user  = await User.findOne({email:req.body.email})
    if(user) return res.send('User can not be registered').status(400)

    user  =  new User({
        name:req.body.name,
        email : req.body.email,
        password : req.body.password,
        isAdmin:req.body.isAdmin
    }); 
   user  =  new User(_.pick(req.body, ['name','email','password']))
    const hashed = await hashPassword(user.password)
   user.password = hashed
    await user.save()
    //return res.send(user).status(201)
    return res.send(_.pick(user,['_id','name','email'])).status(201)
});

router.delete('/admin/:isAdmin/:id',(req,res)=>{
User.findByIdAndRemove({_id:req.params._id})
.then(user => res.send(user))
.catch(err =>res.send(err).status(404))
});

async function getAdmins(){
    const users = await User.find({isAdmin:true});
    console.log(users)
}
getAdmins()

async function nonadmins(){
    const nons = await User.find({isAdmin:false})
    console.log(nons)
}
nonadmins()

module.exports = router;