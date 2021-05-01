const express = require('express');
const app = express();
var db = require('../models/dbconnect');



module.exports.loadevents = (req,res) =>{
    registeredevents = [];
    registeredeventdets = [];
    db.query('SELECT * FROM paidregistration WHERE email = ?',[req.session.email], (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result); 
            result.forEach(event => {
                if(event.eventName1){
                eventname = event.eventName1;
                isPaid = event.isPaid;
                registeredevents.push({eventname,isPaid});
                }
                if(event.eventName2){
                eventname = event.eventName2;
                isPaid = event.isPaid;
                registeredevents.push({eventname,isPaid});
                }
                if(event.eventName3 ){
                eventname = event.eventName3;
                isPaid = event.isPaid;
                registeredevent.push({eventname,isPaid});
                }
                
            })
            console.log(registeredevents);
            db.query('SELECT * FROM events', (err,eventresult) => {
                if(err){
                    console.log(err);
                }
                else{
                    registeredevents.forEach(fullevent => {
                        eventresult.forEach(event =>{
                            if(fullevent.eventname == event.name) {
                                eventname = event.name;
                                isPaid = fullevent.isPaid;
                                eventdate = event.date;
                                eventdesc = event.description;
                                eventorg = event.event_organizer;
                                orgdet = event.organizer_contact;
                                registeredeventdets.push({eventname,eventdate,eventdesc,eventorg,orgdet,isPaid});
                            }
                            
                        })
                        console.log("registeredeventdets");
                        console.log(registeredeventdets);

                    })
                    res.render('user', {name: req.session.name, user: "User", events: registeredeventdets});
                }
            })
        }
    });

};

module.exports.loadeventsatreg = (req,res) =>{
    eventstoregister = [];
    db.query('SELECT * FROM events', (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            result.forEach(event => {
            eventstoregister.push(event.name)
            })
            console.log(eventstoregister);
            res.render('eventreg', {events:JSON.stringify(eventstoregister)});
        }
    })
}