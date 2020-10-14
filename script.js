var APIkey = "e8f89c7f6e46ebcce4956f65813111a9"
var storedCities;
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityURL = "";


var cityNameHeader = $("<h2>")
$(".card-body").append(cityNameHeader);
var tempHeader = $("<p>")
$(".card-body").append(tempHeader);
var windHeader = $("<p>")
$(".card-body").append(windHeader)
var humidityHeader = $("<p>")
$(".card-body").append(humidityHeader)

$("#search-city").on("click", function(){
  cityURL = $("#city-input").val()
//   add city URL to cities array
cities.push(cityURL)

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityURL + "&appid=" + APIkey;
  $.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {
    // Create CODE HERE to log the resulting object
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    var cityName = response.name;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    // var uvIndex = response.current.uvi;
    var tempF = Math.round(((temp-273.15) * 1.80 +32))
    console.log(temp)
    console.log(response)
    // Create CODE HERE to transfer content to HTML
    cityNameHeader.text(cityName);
    tempHeader.text("Temperature: " + tempF + "°");
    windHeader.text("Wind Speed: " + windSpeed);
    humidityHeader.text("Humidity: " + humidity);
    // Local storage set 
    localStorage.setItem("cities", JSON.stringify(cities))
    
    // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
    // var movieTitle = $("<td>").text(response.Title);
    // var movieYear = $("<td>").text(response.Year);
    // var movieActors = $("<td>").text(response.Actors);
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML


    // five day forcast create seperate AJAX API 
   });
   
  console.log(cityURL)
})
// We then created an AJAX call
