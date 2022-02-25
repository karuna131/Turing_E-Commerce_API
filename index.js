const express = require('express');
const bodyParser = require('body-parser');
const cookie_parser = require('cookie-parser')
const router = require('./routes/user');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookie_parser())
app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})