const express = require('express');
const router = express.Router();
const Crud = require('../models/crud');
 
router.post('/createorder', (req, res, next) => {
    var newcrud = new Crud({
        orderId: req.body.orderId,
        orderType: req.body.orderType,
        fname: req.body.fname,
        lname: req.body.lname,
        companyName:req.body.companyName,
        Address:req.body.Address,
        pincode:req.body.pincode,
        city:req.body.city,
        state:req.body.state,
        payment:req.body.payment,
        product:req.body.product,
        phone:req.body.phone,
        weight:req.body.weight,
        length:req.body.length,
        width:req.body.width,


    });
 
    newcrud.save((err, crud) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        } else {
            res.status(200).json({ msg: crud });
        }
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
router.delete('/delete/:_id', (req, res, next) => {
    Crud.findOneAndRemove({ _id: req.params._id }, (err, crud) => {
        if (err) {
            res.status(500).json({ errmsg: err });
            return;
        }
 
        if (!crud) {
            res.status(404).json({ errmsg: 'Crud not found' });
            return;
        }
 
        res.status(200).json({ msg: 'Crud deleted successfully' });
    });
});
 
module.exports = router;
