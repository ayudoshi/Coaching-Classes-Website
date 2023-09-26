const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// const url = 'process.env.MONGO_LOCAL';
// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log('db connected');
//         // const db = client.db('sample_mflix');
//     } catch (err) {
//         console.log(err);
//     }
// }
// run();

// mongoose.connect('mongodb://127.0.0.1:27017/wt')
mongoose.connect(process.env.MONGO_URL)
.then(() => { 
    console.log("connected to DB!")
    console.log("Listening on 3000")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});

const staticPath = path.join(__dirname,'../');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use(express.static(staticPath));
app.set('view engine', 'html');
// app.set('view engine','hbs');

app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/pages'));



app.listen(3000);