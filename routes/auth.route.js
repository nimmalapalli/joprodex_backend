const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Nav=require('../models/navmodel')
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            companyname: req.body.companyname,
        });

        await user.save();
        res.json({ success: true, message: 'ACCOUNT CREATED SUCCESSFULLY' });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: false, message: 'Email Already Exists' });
        }
        console.error(err);
        res.json({ success: false, message: 'Authentication failed' });
    }
});


router.post('/login',(req,res)=>{
    
    User.find({email:req.body.email}).exec().then((result)=>{
        if(result.length<1){
         return res.json({success:false,message:'User not found'})
        }
        const user = result[0];
        bcrypt.compare(req.body.password,user.password,(err,ret)=>{
            if(ret){
                const payload={
                  userId:user._id
                }
                const token=jwt.sign(payload,"webBatch")
                return res.json({success:true,token:token,message:"login successfully"})
               
            }else{
                return res.json({success:false,message:"login failed"})
            }
        })
    }).catch(err=>{
        res.json({success:false,message:'Authentication failed'})
    })
});

router.get('/profile',checkAuth,(req,res)=>{
    const userId=req.userData.userId;
User.findById(userId)
.exec()
    .then((result)=>{
        res.json({success:true,data:result})
    }).catch((err)=>{
        res.json({success:false,message:"server error"})
    })
  
})

router.get('/success', async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(200).json({ data: user, message: 'Authentication login successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.post('/createNav',(req,res)=>{
    const nav= new Nav({
        navitem:req.body.navitem
    })
    nav.save()
    res.json({message:'created nav item successfully'})
})
router.get('/navigation',(req,res)=>{
    Nav.find({},(err,navitem)=>{
        res.json({ data: navitem, message: 'Cruds retrieved successfully' });
    })
 
})
router.delete('/deletenavitem/:id',(req,res)=>{
    Nav.findOneAndRemove({_id:req.params.id},(err,navitem)=>{
        res.json({  message: 'Cruds delete successfully' });
    })
 
})
module.exports =router;

