const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/wt')
.then(() => { 
    console.log("connected to DB!")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});

const staticPath=path.join(__dirname ,'../Frontend');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use(express.static(staticPath));
app.set('view engine','html');
// app.set('view engine','hbs');

app.use('/admin',require('./routes/admin'));
app.use('/',require('./routes/pages'));



app.listen(3000);