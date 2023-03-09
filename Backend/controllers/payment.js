const express = require('express');
const payments = require('razorpay');
const crypto = require('crypto');
// const { validatePaymentVerification } = require('./dist/utils/razorpay-utils');

const instance = new payments({
    key_id: 'rzp_test_0wINYtdIizGUh1',
    key_secret: 'dQne6xVtCHQp4fMR8mVuBaiK'
})
let orderData;
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

exports.verify = (req, res) => {
    try {
        let hmac = crypto.createHmac('sha256', 'dQne6xVtCHQp4fMR8mVuBaiK');
        hmac.update(orderData.id + "|" + req.body.razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature == req.body.razorpay_signature) {
            console.log("Heyyy");
        }
    } catch (err) {
        console.log(err);
    }

};