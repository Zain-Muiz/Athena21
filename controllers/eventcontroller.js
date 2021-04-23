const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');





module.exports.registerevent = (req,res) =>{
  
    const {numevents, event1, event2, event3, isISTE, ISTEregno} = req.body;
    req.session.regdetails = req.body;


    db.query("INSERT INTO registration SET ?", {name : req.session.name, email : req.session.email, eventName1: event1, eventName2: event2, eventName3: event3, isISTE: isISTE, ISTEregno: ISTEregno },(error,reusult)=>{
        if(error){
            console.log(error)
        }
        else {
            res.redirect('/userdashboard/eventpayment');
        }

    });

}