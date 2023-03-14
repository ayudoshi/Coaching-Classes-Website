const express = require('express');
const payments = require('razorpay');
const crypto = require('crypto');
const enroll = require('../models/enroll');
// const { validatePaymentVerification } = require('./dist/utils/razorpay-utils');

const instance = new payments({
    key_id: 'rzp_test_0wINYtdIizGUh1',
    key_secret: 'dQne6xVtCHQp4fMR8mVuBaiK'
})
let orderData;
let Enroll;
exports.createOrder = (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: 'INR'
    }

    instance.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
        } else {
            orderData = order;
            res.json(order);
        }
    })
};

exports.verify = async (req, res) => {
    try {
        let hmac = crypto.createHmac('sha256', 'dQne6xVtCHQp4fMR8mVuBaiK');
        hmac.update(orderData.id + "|" + req.body.razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature == req.body.razorpay_signature) {
            let values = await enroll.findOne({ email: Enroll.email });
            let feesPaid={
                fees:"true"
            }
            let resp = await enroll.updateOne(values, feesPaid);
            res.json({
                status:"success",
                msg:"payment done"
            })
        }
    } catch (err) {
        console.log(err);
    }

};

exports.enrollData = async (req, res) => {

    let values = [];


    try {
        values = await enroll.findOne({ "email": req.body.email });
    }
    catch (err) {
        res.json({ status: "error", msg: "Some error occured" });
    }

    if (values!=null && values.fees==true) {
        res.json({ status: "error", msg: "Email already registered for some course" });
    }
    else if (values!=null && values.fees==false) {
        res.json({
            status: "success",
            msg: "Pay the fees for the course"
        })
    }
    else {
        Enroll = new enroll({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course
        });
        try {

            Enroll.save().then(() => {
                res.json({
                    status: "success",
                    msg: "Pay the fees for the course"
                })
            })
        }
        catch (err) {
            res.json({ msg: err });
        }
    }

};