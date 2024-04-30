const express = require('express');
const router = express.Router();
const Crud = require('../models/crud');

router.post('/createorder', (req, res, next) => {
    const newcrud = new Crud({
        orderId: req.body.orderId,
        orderType: req.body.orderType,
        fname: req.body.fname,
        lname: req.body.lname,
        companyName: req.body.companyName,
        Address: req.body.Address,
        pincode: req.body.pincode,
        city: req.body.city,
        state: req.body.state,
        payment: req.body.payment,
        product: req.body.product,
        phone: req.body.phone,
        weight: req.body.weight,
        length: req.body.length,
        width: req.body.width,
    });

    newcrud.save()
        .then(savedCrud => {
            res.status(200).json({ msg: savedCrud });
        })
        .catch(err => {
            res.status(500).json({ errmsg: err.message });
        });
});

router.get('/read', async (req, res, next) => {
    try {
        const cruds = await Crud.find({});
        res.status(200).json({ data: cruds, message: 'Cruds retrieved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

 router.get('/getByuserid',(req,res)=>{
    const userId = req.params.userId;
    User.findOne(userId,(err,data)=>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data)
        }
    })

})
 
router.put('/update/:id', async (req, res, next) => {
    const crudId = req.params.id;
 
    try {
        // Find the crud by ID
        const crud = await Crud.findById(crudId);
 
        if (!crud) {
            return res.status(404).json({ errmsg: 'Crud not found' });
        }
 
        // Update crud fields based on the request body
        crud.EmpID = req.body.EmpID;
        crud.EmpName = req.body.EmpName;
        crud.Role = req.body.Role;
        crud.Teamlead = req.body.Teamlead;
        crud.MailID = req.body.MailID;
 
        // Save the updated crud
        const updatedCrud = await crud.save();
 
        res.status(200).json({ msg: 'Crud updated successfully', crud: updatedCrud });
    } catch (error) {
        console.error('Error updating crud:', error);
        res.status(500).json({ errmsg: 'Internal Server Error' });
    }
});
router.delete('/delete', async (req, res, next) => {
    try {
        const deletedCrud = await Crud.findByIdAndDelete(req.params._id);
 
        
        res.status(200).json({ msg: 'Crud deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errmsg: err.message });
    }
});

module.exports = router;
