//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){

    const firstName = req.body.fname;
    const  lastName = req.body.lname;
    const  email= req.body.email;
    

    const  data ={
        members: [  //array of objects
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {   //object
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
    };

    const  jsonData = JSON.stringify(data);
    const url ="https://us22.api.mailchimp.com/3.0/lists/1f2bd08c07";

    const options = {
        method: "POST",
        auth: "saksham1:a7d43219e3845f606be94485872b31b1-us22"

    }


   const request = https.request(url  ,  options  ,  function(response) {

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })

    })
    request.write(jsonData);
    request.end();
  
});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});

//API keys
//a7d43219e3845f606be94485872b31b1-us22
//list id-1f2bd08c07