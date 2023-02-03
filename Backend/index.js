const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wt',{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to DB!");
    }
});

const staticPath=path.join(__dirname ,'../Frontend');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(express.static(staticPath));
app.set('view engine','html');


app.use('/',require('./routes/pages'));


app.listen(3000);