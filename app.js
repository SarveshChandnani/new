const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require('request');
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: "True" }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.post("/", function (req, res) {
  const fName = req.body.FirstName;
  const LName = req.body.LastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LName: LName,
        },
      },
    ],
  };

  const JSONdata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/ec0491fcc1";
    const options = {
        method : "POST",
        auth : "sarvesh:aa275530e30b087f609f461088d3f60d-us21"
    }

  const request = https.request(url , options, function(response){

    response.on("data" , function(data){
        console.log(JSON.parse(data));
        if(response.statusCode == "200"){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
    })

  })

  request.write(JSONdata);
  request.end();

  

});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started");
});

//ec0491fcc1
