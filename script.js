var APIkey = "e8f89c7f6e46ebcce4956f65813111a9"
var storedCities;
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var uniqueCities = [];
$.each(cities, function(i, el){
    if($.inArray(el,uniqueCities) === -1) uniqueCities.push(el);
});
var cityURL = "";


var cityNameHeader = $("<h2>");
$(".card-body").append(cityNameHeader);
var tempHeader = $("<p>")
$(".card-body").append(tempHeader);
var windHeader = $("<p>");
$(".card-body").append(windHeader);
var humidityHeader = $("<p>");
$(".card-body").append(humidityHeader);

// load previous items from local storage and add the next one after a city is added 


for (var i = 0; i < uniqueCities.length; i++){
    var mostRecentSearch = uniqueCities.length - 1; 
    var lastSearch = uniqueCities[mostRecentSearch];
}
// add loops that exist to an HTML element/ create a button or anchor tag to allow a click that triggers another AJAX call

$("#search-city").on("click", function(){
  cityURL = $("#city-input").val()
//   add city URL to cities array
cities.push(cityURL)

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityURL + "&appid=" + APIkey;
  $.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {
   
    // Create variables for main card body to add weather information about the city. 
    var cityName = response.name;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var tempF = Math.round(((temp-273.15) * 1.80 +32))
    // Add list items to side bar when you search for a new city
    var cityItem = $("<li>");
    cityItem.addClass("list-group-item city-item");
    cityItem.text(response.name);
    cityItem.attr("lat", response.coord.lat);
    cityItem.attr("lon", response.coord.lon);
    $("#city-list").prepend(cityItem);


    // Create CODE HERE to transfer content to HTML
    cityNameHeader.text(cityName);
    tempHeader.text("Temperature: " + tempF + "°");
    windHeader.text("Wind Speed: " + windSpeed);
    humidityHeader.text("Humidity: " + humidity);
    // Local storage set 
    localStorage.setItem("cities", JSON.stringify(cities))
   });

// //    five day forecast
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityURL+"&units=imperial&appid=" + "e8f89c7f6e46ebcce4956f65813111a9";
$.ajax({
  url: queryURL,
  method: "GET"
 }).then(function(forecast) {
   console.log(forecast);
   var forecastDiv = $("<div  id='fiveDayForecast'>");
   var forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
   forecastDiv.append(forecastHeader);
   var cardDeck = $("<div  class='card-deck'>");
   forecastDiv.append(cardDeck);
 
   for (i=0; i<5; i++) {
    var forecastCard = $("<div class='card mb-3 mt-3'>");
    var cardBody = $("<div class='card-body'>");
    var date = new Date();
    var val=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
    var forecastDate = $("<h5 class='card-title'>").text(val);
    cardBody.append(forecastDate);
    var getCurrentWeatherIcon = forecast.list[i].weather[0].icon;
    console.log(getCurrentWeatherIcon);
    var displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png />");
    cardBody.append(displayWeatherIcon);
    var getTemperature = forecast.list[i].main.temp;
    var temperatureElement = $("<p class='card-text'>").text("Temp: "+getTemperature+"° F");
    cardBody.append(temperatureElement);
    var getHumidity = forecast.list[i].main.humidity;
    var humidityElement = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
    cardBody.append(humidityElement);
    forecastCard.append(cardBody);
    cardDeck.append(forecastCard);
}     $("#forecast").html(forecastDiv);    


 });

 function historyDisplayWeather(){
  cityName = $(this).attr("data-name");
  displayWeather();
  displayFiveDayForecast();
  console.log(cityName);
}

// Create on.click for when user selects a city that resides in their previous search history
$(document).on("click", ".city", historyDisplayWeather);
})
