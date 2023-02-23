

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=a71a6900dd94bc63c4c73589986ad3d7"
  https.get(url,function(response){
    console.log(response);
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const humidity = weatherData.main.humidity;
      const temp = weatherData.main.temp;
      
      const windSpeed = weatherData.wind.speed ;
      const weatherDescription = weatherData.weather[0].description;
      const latitude = weatherData.coord.lat;
      const longitude = weatherData.coord.lon;
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    //   res.write("<p>The weather is currently "+ weatherDescription + "<p>");
    //   res.write("<h1>The temperature in " + query +   " is " + celsius + "celsius.</h1>");
    //   res.write("<img src=" + imageURL +">");
    //   res.write("<p>humidity" + humidity+ "</p>");
    //   res.write("<p>Windspeed:"+ windSpeed + "</p");

    //   res.send();
    res.render("weather", {humid: humidity,temp: temp, windSpeed: windSpeed, weatherDescription: weatherDescription,imageURL:imageURL,latitude:latitude,longitude:longitude,query:query})
    })
  })

  
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
})

