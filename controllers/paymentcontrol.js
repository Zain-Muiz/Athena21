const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');





module.exports.amountgenerator = (req,res) =>{
    console.log(req.session.regdetails);
    console.log(req.session.regdetails.event1)
    db.query("SELECT * FROM events ", async(error, results)=>{
    if(results.length===0){
        console.log(results);
        return res.send("Email Or Password Incorrect");
    }
     else{
        event1 = "";
        event2 = "";
        event3 = "";
        event1 = req.session.regdetails.event1;
        event2 = req.session.regdetails.event2;
        event3 = req.session.regdetails.event3;
        registrationamount =0;
        console.log(registrationamount);  
        console.log(results);
        results.forEach(event => {
            console.log("hey");
            console.log(event.name);
            if(event.name == event1){
                registrationamount += event.eventamount;
            }
            if(event.name == event2){
                registrationamount += event.eventamount;
            }
            if(event.name == event3){
                registrationamount += event.eventamount;
            }
            
        });      
        res.render('payment', {registrationamount:registrationamount});  
     }
    if(error){
        console.log(error)
    }
})
}