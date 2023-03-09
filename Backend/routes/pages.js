const express =  require('express');
const router = express.Router();
const path=require('path');
const postEnroll=require('../controllers/postEnroll');
const auth=require('../controllers/auth');
const payment=require('../controllers/payment');

const staticPath=path.join(__dirname ,'../../Frontend');

router.get('/',(req,res)=>{
    res.sendFile('index.html',{root:staticPath});
});

router.get('/german',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.sendFile('german.html',{root:staticPath});
    }
    else{
        res.sendFile('login.html',{root:staticPath});
    }
});

router.get('/spanish',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.sendFile('spanish.html',{root:staticPath});
    }
    else{
        res.sendFile('login.html',{root:staticPath});
    }
});

router.get('/english',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.sendFile('english.html',{root:staticPath});
    }
    else{
        res.sendFile('login.html',{root:staticPath});
    }
});

router.get('/home',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.sendFile('home.html',{root:staticPath});
    }
    else{
        res.sendFile('login.html',{root:staticPath});
    }
});

router.get('/profile',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.sendFile('profile.html',{root:staticPath});
    }
    else{
        res.sendFile('login.html',{root:staticPath});
    }
});

router.get('/profileDetails',auth.loggedIn,auth.getDetails);

router.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:staticPath});
});
router.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:staticPath});
});

router.get('/payment',(req,res)=>{
    res.sendFile('payment.html',{root:staticPath});
})

router.post('/',postEnroll.enroll);
router.post('/register',auth.register);
router.post('/login',auth.login);
router.post('/payment',payment.createOrder);
router.post('/paymentVerify',payment.verify);



module.exports=router;