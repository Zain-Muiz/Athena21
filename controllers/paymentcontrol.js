const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');
var Razorpay=require("razorpay");
var bodyParser = require('body-parser');
const session = require('express-session');
var request = require('request');


let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY , // your `KEY_ID`
  key_secret:process.env.RAZORPAY_SIGNATURE  // your `KEY_SECRET`
})






module.exports.amountgenerator = (req,res) =>{
    // db.query("SELECT FROM registration WHERE name = ? ",[req.session.name], async(error, regresults)=>{
    //     if(regresults.length===0){
    //         console.log(results);
    //         return res.send("Email Or Password Incorrect");
    //     }
    //     if(error){
    //         console.log(error)
    //     }
    // console.log(regresults);
    console.log(req.session.regdetails);
    console.log(req.session.regdetails.event1)
    db.query("SELECT * FROM events ", async(error, results)=>{
    if(results.length===0){
        console.log(results);
        return res.send("Email Or Password Incorrect");
    }
     else{
        CoupunCode = [{name:"hi",amount:50},{name: "hello", amount:100}];
        event1 = req.session.regdetails.event1;
        event2 = req.session.regdetails.event2;
        event3 = req.session.regdetails.event3;
        IsteReg = req.session.regdetails.ISTEregno;
        enteredCCode = "hello";
        registeredevents = [];
        
        registrationamount =0;
        console.log(registrationamount);  
        console.log(results);
        results.forEach(event => {
            if(event.name == event1){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event2){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event3){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            console.log(registeredevents);
            CoupunCode.forEach(coupon =>    {
                if(coupon.name == enteredCCode)
                    registrationamount-=coupon.amount;
            })
            
            
               
            
 
              //////////    

        });
          //////// Razor pay API

        req.session.registrationamount = registrationamount;
        console.log("hey line 76");
        res.render('payment', {events:registeredevents,registrationamount:registrationamount});  
     }
    if(error){
        console.log(error)
    }
})
    
//}) db querry
}

/**************** ORDER ID ****************/
async function orderIdcreator() {
    // return the response
    var params = {
        amount: registrationamount * 100,  
        currency: "INR",
        receipt: "su001",
        payment_capture: '1'
      };
    return await createOrderId(params);
  }

function createOrderId(params) {
    return new Promise((resolve, reject) => {
        instance.orders.create(params).then((data) => {
            orderid = data;
            console.log("heyyyyy");
            console.log(orderid);
            resolve(orderid);
     }).catch((error) => {
            console.log(error);
            reject(error);
     }) 
    }
    )}

    /**************** ORDER ID ****************/

    /**************** PAYOUT ****************/
    
    module.exports.paymentcontrol = async(req,res) =>{
        orderid = await orderIdcreator();
        orderdet =[{id:orderid.id, key:process.env.RAZORPAY_KEY, name:req.session.name}];


        req.session.orderid = orderid;
        res.json(orderdet);
    }


    /**************** PAYOUT ****************/
    /**************** PAYOUT VERIFICATION ****************/

    module.exports.paymentaftercontrol = async(req,res) =>{
        orderid= req.session.orderid.id;
        paymentid = req.body.razorpay_payment_id;
        const {numevents, event1, event2, event3, isISTE, ISTEregno} = req.session.regdetails;
        const crypto = require("crypto");
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SIGNATURE);

        hmac.update(orderid + "|" + paymentid);
        let expectedSignature = hmac.digest('hex');
        var response = {"status":"failure"}
        if(expectedSignature === req.body.razorpay_signature){
            console.log(req.session.email);
            db.query("INSERT INTO paidregistration SET ?", {name : req.session.name, email : req.session.email, eventName1: event1, eventName2: event2, eventName3: event3, isISTE: isISTE, ISTEregno: ISTEregno,orderid: orderid, paymentid: paymentid, isPaid: "1" },(error,reusult)=>{
            //db.query("INSERT INTO paidregistration SET ? WHERE email = ? AND orderid = ? ",[{orderid: orderid, paymentid: paymentid, isPaid: "1"},req.session.email, "NP"], (error,reusult)=>{
                if(error){
                    console.log(error)
                }
                else {
                    console.log(reusult);
                    console.log("successs");
                    
                }
            });
            response={"status":"success"}
        }
        res.send(response);
        }

    /**************** PAYOUT VERIFICATION ****************/
