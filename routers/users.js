const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async(req,res) => {
    try{
           const users = await User.find()
           res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const user = await User.findById(req.params.id)
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const { firstname,lastname,email,password} = req.body;
    let todo = new User({
        firstname,lastname,email,password,
    });

    try{
        todo =  await todo.save() 
        res.json(todo)
    }catch(err){
        res.status(500).send(err.message);
        console.log(err.message)
    }
})

router.put('/:id',async(req,res)=> {
    try{
        const user = await User.findById(req.params.id) 
        user.firstname=req.body.firstname;
        user.lastname=req.body.lastname;
        user.email=req.body.email;
        user.password=req.body.password;
        const a1 = await user.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.delete('/:id',async(req,res)=>{
    try{
        // const user = await User.findById(req.params.id)
        
        // const a1 = await user.save()
        // res.json(a1)
        const id = req.params.id;
        await User.findByIdAndRemove(id).exec()
        res.send('itemdeleted')
        // User.deleteOne({_id:req.params.id}).then(a1=>{
        //     res.json(a1)
        // })
    }
    catch(err){
        res.send('Error')
    }
})

module.exports = router