const express = require("express");
const https = require("https");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "e3934354d7c5b0d07578f78af06d4556";
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description
            const feelsLike = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+".png";
            res.write("<h1>the temperature in " + query + " is " + temp + " degrees</h1>");
            res.write("and the weather is " + weatherDescription + ", so it probably feels like about " + feelsLike + " degrees")
            res.write("<img src=" + imageURL + ">")
            res.send();
        });
    });

})

app.listen(3000, function(){
    console.log("server is running on port 3000")
})