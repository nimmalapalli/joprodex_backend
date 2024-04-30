const express = require ('express');
const router = express.Router();
const ShipmentModel = require('../models/shipmentModel');
 
router.post('/creates', async (req, res, next) => {
    try {
        const shipmentModel = await new ShipmentModel({
            order_Id: req.body.order_Id,
            customer_Name: req.body.customer_Name,
            customer_Address: req.body.customer_Address,
            billing_Num: req.body.billing_Num,
            pickup_loc: req.body.pickup_loc,
            pin_Code: req.body.pin_Code,
            shipping_Date: req.body.shipping_Date,
        }).save();
        
        res.status(200).json({ msg: 'Shipment created successfully', shipment: shipmentModel });
    } catch (err) {
        console.error("Error creating shipment:", err);
        res.status(500).json({ errmsg: "Internal server error. Please try again later." });
    }
});

 
router.get('/reads', async (req, res, next) => {
    try {
        const shipmentModels = await ShipmentModel.find({});
        res.status(200).json({ data: shipmentModels, message: 'Orders shipped successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.put('/updates/:id', async (req, res, next) => {
    const shipmentModelId = req.params.id;
 
    try {
        const shipmentModel = await ShipmentModel.findById(shipmentModelId);
 
        if (!shipmentModel) {
            return res.status(404).json({ errmsg: 'Order not found' });
        }
 
        
        shipmentModel.order_Id = req.body.order_Id;
        shipmentModel.customer_Name = req.body.customer_Name;
        shipmentModel.customer_Address = req.body.customer_Address;
        shipmentModel.billing_Num = req.body.billing_Num;
        shipmentModel.pickup_loc = req.body.pickup_loc;
        shipmentModel.pin_Code = req.body.pin_Code;
        shipmentModel.shipping_Date = req.body.shipping_Date;
 
        
        const updatedShipmentModel = await shipmentModel.save();
 
        res.status(200).json({ msg: 'Shipment updated successfully', shipment: updatedShipmentModel });
    } catch (error) {
        console.error('Error updating shipment:', error);
        res.status(500).json({ errmsg: 'Internal Server Error' });
    }
});
router.delete('/deletes/:_id', (req, res, next) => {
    ShipmentModel.findOneAndRemove({ _id: req.params._id }, (err, shipmentModel) => {
        if (err) {
            res.status(500).json({ errmsg: err });
            return;
        }
 
        if (!shipmentModel) {
            res.status(404).json({ errmsg: 'ShipmentModel not found' });
            return;
        }
 
        res.status(200).json({ msg: 'ShipmentModel deleted successfully' });
    });
});
// router.delete('/deletes',  async (req, res, next) => {
//     const shipmentModelId = req.params.id;
//     try {
//         const shipmentModel = await ShipmentModel.findOneAndRemove(shipmentModelId);
 
//         if (!shipmentModel) {
//             return res.status(404).json({ errmsg: 'Order not found' });
//         }
//     }
//     catch (error) {
//         console.error('Error updating shipment:', error);
//         res.status(500).json({ errmsg: 'Internal Server Error' });
//     }
// })
 
 
module.exports = router;
 
 
 








