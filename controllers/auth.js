const bcrypt = require('bcrypt')
const Joi = require('joi')
const _= require('lodash')
const express = require('express')
const {User} = require('../model/user.model')

var router = express.Router()

router.post('/jwt',async(req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.send('Invalid email or password').status(400)

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send('invalid email or password').status(400)
    return res.send(user.generateAuthToken())
})
router.post('/bcrypt',async(req,res)=>{
    const {error} = validate(req.body)
    if(!error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({email:req.body.emai})
    if(!user) return res.send('Invalid email or password').status(400)

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send('Invalid email or password').status(400)
    
    return res.send(_.pick(user,['_id','name','email']))
})
function validate(req){
    const schema = {
        email: Joi.required(),
        password: Joi.string().max(25).min(3).required()
    }
    return Joi.validate(req,schema)
}
module.exports = router