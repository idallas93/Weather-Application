var APIKey = "e8f89c7f6e46ebcce4956f65813111a9";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL)
    // Create CODE HERE to log the resulting object
    console.log(response)
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    var cityName = response.name
    var windSpeed = response.wind.speed
    var humidity = response.main.humidity
    var temp = response.main.temp
    var tempF = Math.round(((temp-273.15) * 1.80 +32))
    console.log(temp)
    // Create CODE HERE to transfer content to HTML
    var cityNameHeader = $("<h2>").text(cityName);
      $("body").append(cityNameHeader);
    var tempHeader = $("<p>").text(tempF);
      $("body").append(tempHeader);
    var windHeader = $("<p>").text(windSpeed);
      $("body").append(windHeader)
    var humidityHeader = $("<p>").text(humidity);
      $("body").append(humidityHeader)

    // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
    // var movieTitle = $("<td>").text(response.Title);
    // var movieYear = $("<td>").text(response.Year);
    // var movieActors = $("<td>").text(response.Actors);
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML

  });
