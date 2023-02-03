const express =  require('express');
const router = express.Router();
const path=require('path');
const postEnroll=require('../controllers/postEnroll');

const staticPath=path.join(__dirname ,'../../Frontend');

router.get('/',(req,res)=>{
    res.sendFile('index.html',{root:staticPath});
});
router.get('/home',(req,res)=>{
    res.sendFile('home.html',{root:staticPath});
});
router.get('/ayush',(req,res)=>{
    res.sendFile('ayush.html',{root:staticPath});
});

router.post('/',postEnroll.enroll);


module.exports=router;