const express = require('express');
const router = express.Router();
const crud = require('../models/crud');

const user = require('../models/user');


router.post('/create', (req, res, next) => {
    const newcrud = new crud({
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

// async function getCrudWithUser() {
//     try {
//         const result = await crud.aggregate([
//             {
//                 $lookup: {
//                     from: 'user', 
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'user'
//                 }
//             }
//         ]);
//         return result;
//     } catch (error) {
//         console.error('Error occurred while performing lookup:', error);
//         throw error;
//     }
// }

router.get('/read', async (req, res, next) => {
    try {
        const cruds = await cruds.find({});
        res.status(200).json({ data: cruds, message: 'Cruds retrieved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

 router.get('/getByuserid',(req,res)=>{
    const userId = req.params.userId;
    user.findOne(userId,(err,data)=>{
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
        
        const crud = await crud.findById(crudId);
 
        if (!crud) {
            return res.status(404).json({ errmsg: 'Crud not found' });
        }
 
        crud.orderId = req.body.orderId;
        crud.orderType = req.body.orderType;
        crud.fname = req.body.fname;
        crud.lname = req.body.lname;
        crud.companyName = req.body.companyName;
        crud.Address = req.body.Address;
        crud.pincode = req.body.pincode;
        crud.city = req.body.city;
        crud.state = req.body.state;
        crud.payment = req.body.payment;
        crud.product = req.body.product;
        crud.phone = req.body.phone;
        crud.weight = req.body.weight;
        crud.length = req.body.length;
        crud.width = req.body.width;
        
        const updatedCrud = await crud.save();
 
        res.status(200).json({ msg: 'Crud updated successfully', crud: updatedCrud });
    } catch (error) {
        console.error('Error updating crud:', error);
        res.status(500).json({ errmsg: 'Internal Server Error' });
    }
});
router.delete('/delete', async (req, res, next) => {
    try {
        const deletedCrud = await crud.findByIdAndDelete(req.params._id);
 
        
        res.status(200).json({ msg: 'Crud deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errmsg: err.message });
    }
});

module.exports = router;
