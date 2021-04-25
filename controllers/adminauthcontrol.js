
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
var db = require('../models/dbconnect');
var path = require('path');
app.use(express.static('public'));


    module.exports.login = (req,res) =>{
 
        
    try{
        const {email, password} = req.body;
        req.session.email = email;
        
        if(!email || !password){
            
            return res.send("No fields can be empty");
        }
        db.query("SELECT * FROM admin where email = ?", [email], async(error, results)=>{
            if(results.length===0){
                return res.send("Email Or Password Incorrect");
            }
            // else{
            //     username = results[0].name;
            //     admintype = results[0].category;             
            // }
            if(error){
                console.log(error)
            }
            if( !results || !(await (bcrypt.compare(password, results[0].password))) ){

                return res.send("Email Or Password Incorrect")
            }
            else{
                
                req.session.name=  results[0].name;
                req.session.admintype = results[0].category;
                res.redirect('/admindashboard');
                
            }
        })
        
    }
    catch(error){
        console.log(error);

    }}

    module.exports.adminroute = (req,res) =>{
        console.log(req.session.name);
 
    if(req.session.name){
        admintype = req.session.admintype;
        if (admintype == "organizer"){
            res.render('orgdashmain',{name: req.session.name});
        }
        else if (admintype == "superadmin"){
            res.render('orgdashmain');  
        }
        else if (admintype == "volunteer"){
            res.render('orgdashmain');  
        }
        else if (admintype == "finhead"){
            res.render('finhead');  
        }
        else{
        res.send("Unauthorized Access");
        res.redirect("/admin/auth/login");
    }

        try{
           console.log('try keri');
            
        }
        catch(error){
            console.log(error);
    
        }
      }
    else {
        res.send("please log in");
    }}

