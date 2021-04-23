const { json } = require('body-parser');
const express = require ('express');
const app = express();
var session = require('express-session');
require('dotenv').config()
const host = process.env.HOST ;
const port = process.env.PORT;
const sentmail = require('../controllers/mail');
var path = require('path');


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(session({
    secret:"aaa",
    resave: false,
    saveUninitialized: false    
}))

app.set('view engine', 'hbs');
  
// routes
  //pages route
const pagesRoute = require('../routes/pages')
app.use('/', pagesRoute);


  //auth route
const authRoute = require('../routes/auth')
app.use('/auth', authRoute);
const adminauthRoute = require('../routes/adminauth')
app.use('/admin/auth', adminauthRoute);

//send Emails :

app.post('/email',(req,res) => {
  // TODO
  // Sent mail
  var otptext = Math.floor((Math.random()*10000)+1);
  req.session.genotp = otptext;
  sentmail(req.session.email,otptext)
  res.json({ message: 'Message Recieved!!!'})
});







app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});