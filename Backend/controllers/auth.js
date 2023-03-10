const express = require('express');
// const app=express();
// const router=require('../routes/pages');
const register = require('../models/register');
const jwt = require('jsonwebtoken');
const email = require('../controllers/email');



exports.register = async (req, res) => {

    let values = [];

    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        res.json({ status: "error", error: "Some error occured" });
    }

    if (values != null) {
        
        // res.render('login',{
        //     RegisterStatus:true,
        //     error:"Email already exist please login here"
        // })
        res.json({ status: "error", msg: "Email already registered" });
    }
    else {
        const Register = new register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
        try {

            Register.save().then(() => {
                register.findOne({ "email": req.body.email }).then((data) => {
                    if (email(data.id, data.email)) {
                        res.json("check email");
                        res.json({ status: "success", msg: "Confirm your email and login" });
                    }
                    else{
                        res.json({status:"error", msg:'Some error occured please register again'});
                    }
                })

            })


        }
        catch (err) {
            res.json({ message: err });
        }
    }

};

exports.login = async (req, res) => {
    let values = [];

    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        return res.status(404);
    }

    if (values == null || values.password != req.body.password) {
        res.json({status:"error", msg:'Check your login credentials'});
    }
    else {
        const token = jwt.sign({ id: values.id }, "ayush1234", {
            expiresIn: 60 * 60,
        })

        const cookieOptions = {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            httpOnly: true
        }

        res.cookie("userLoggedIn", token, cookieOptions);
        res.json({status:"success",success:"Logged In"});
    }

};

exports.loggedIn = async (req, res, next) => {
    // console.log(req.cookies.userLoggedIn);
    // if(!req.cookies.userLoggedIn) return res.user="error";
    try {
        const decoded = jwt.verify(req.cookies.userLoggedIn, "ayush1234");
        let values = [];
        values = await register.findOne({ _id: decoded.id });
        if (values != null) {
            res.name = values.name;
            return next();
        }
    } catch (err) {
        next();
    }
};

exports.getDetails = async (req, res) => {
    try {
        const data = await register.findOne({ name: res.name });
        if (data != null) {
            let newData = {
                name: data.name,
                email: data.email,
                phone: data.phone
            }
            res.json(newData);
        }
    }
    catch (err) {
        res.json({ error: "Some error occured in db" });
    }
};
