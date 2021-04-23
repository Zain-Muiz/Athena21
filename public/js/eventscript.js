var eventlist =[
    "event 1",
    "event 2",
    "event 3",
    "event 4",
    "event 5",
    "event 6"
];

document.getElementById("isteNo").style.display="none";
var eventOptions = ()=>{
    evOp =""
    eventlist.forEach(eventName => {
        evOp +=  ` <option> ${eventName} </option>  `
    });
    return evOp;
}


var isteCheck =(checkbox)=>{
    var isteNo = document.getElementById("isteNo");
    if(checkbox.checked){
        isteNo.style.display ="block";
    }else{
        isteNo.style.display = "none";
    }
}


var addEvents = (events) =>{
    // console.log(events);
    if( events >3 || events<1 ){
        document.getElementById("eventSelect").value="3";
        events = 3;
    }

        var eventHtml ="";
        
    
        for(i=0; i<events; i++){
            
    
    
            //elements create with ids    event1 ,event2 , event
            eventHtml += 
    
            `     <div class="form-group mb-4" > <select id="event${i + 1}" name="event${i + 1}" class=\"form-control border-0 shadow form-control-lg\">` +
            `     <option> Select event ${i+1}</option>  ` +
                   eventOptions() +
            "     </select> </div>  " ;
    
        }
    
        // console.log(eventHtml);
        var elementContainer = document.getElementById("eventContainer");
        elementContainer.innerHTML= eventHtml;
    
};