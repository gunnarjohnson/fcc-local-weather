// Gets latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  
  // Gets location from Google API
  var geocode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + long + '&language=en';
  $.getJSON(geocode).done(function(location) {
    $('#city').html(location.results[0].address_components[2].long_name + ",");
    $('#state').html(location.results[0].address_components[4].long_name);
  });

  // Declares variables containing Dark Sky API URLs
  var darkSkyFahrenheitData = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5adc5975133ce7fd94e77e0aba23b884/" + lat + "," + long + "?units=us";
  var darkSkyCelsiusData = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5adc5975133ce7fd94e77e0aba23b884/" + lat + "," + long + "?units=si";
  
  // Defines function for choosing icon
  function switchSkycon(darkSkyIcon) {
    switch(darkSkyIcon) {
      case "clear-day":
          document.body.style.backgroundColor = "skyblue";
          iconColor = "goldenrod";
          return Skycons.CLEAR_DAY;
          break;
      case "clear-night":
          document.body.style.backgroundColor = "midnightblue";
          iconColor = "white";
          return Skycons.CLEAR_NIGHT;
          break;
      case "partly-cloudy-day":
          document.body.style.backgroundColor = "skyblue";
          iconColor = "goldenrod";
          return Skycons.PARTLY_CLOUDY_DAY;
          break;
      case "partly-cloudy-night":
          document.body.style.backgroundColor = "midnightblue";
          iconColor = "white";
          return Skycons.PARTLY_CLOUDY_NIGHT;
          break;
      case "cloudy":
          document.body.style.backgroundColor = "darkgrey";
          iconColor = "white";
          return Skycons.CLOUDY;
          break;
      case "rain":
          document.body.style.backgroundColor = "darkgrey";
          iconColor = "royalblue";
          return Skycons.RAIN;
          break;
      case "sleet":
          document.body.style.backgroundColor = "darkgrey";
          iconColor = "white";
          return Skycons.SLEET;
          break;
      case "snow":
          document.body.style.backgroundColor = "darkgrey";
          iconColor = "white";
          return Skycons.SNOW;
          break;
      case "wind":
          document.body.style.backgroundColor = "skyblue";
          iconColor = "white";
          return Skycons.WIND;
          break;
      case "fog":
          document.body.style.backgroundColor = "darkgrey";
          iconColor = "white";
          return Skycons.FOG;
          break;
      default:
          return "";
    }
  }

  // Defines function for current weather info (Fahrenheit)
  function darkSkyF() {
    $.ajax({
      url: darkSkyFahrenheitData,
      success:function(data) { 
        // Current Temp (Actual)
        var currentTempF = Math.round(data.currently.temperature);
        var weatherTempDiv = document.getElementById("weather-temp--actual");
        weatherTempDiv.innerHTML = currentTempF;
        // Current Temp (Unit)
        var weatherTempUnitDiv = document.getElementById("weather-temp--unit");
        weatherTempUnitDiv.innerHTML = "°F";
        // Weather Icon
        var dataCurrentIcon = data.currently.icon
        var skycons = new Skycons();
        skycons.set("weather-temp--icon", switchSkycon(dataCurrentIcon));
        skycons.color = iconColor;
        skycons.play();
      }
    });
  };
  
  // Calls function for current weather info (Fahrenheit) when page loads
  $(document).ready(function() {
    darkSkyF();
  });
  
  // Executes function for current weather info (Fahrenheit) if F button is clicked
  $("#weather-temp--fahrenheit").click(function() {
    darkSkyF();
  });
  
  // Declares function for current weather info (Celsius) and executes if C button is clicked
  $("#weather-temp--celsius").click(function(){
    $.ajax({
      url: darkSkyCelsiusData,
      success:function(data) { 
        // Current Temp (Actual)
        var currentTempC = Math.round(data.currently.temperature);
        var weatherTempDiv = document.getElementById("weather-temp--actual");
        weatherTempDiv.innerHTML = currentTempC;
        // Current Temp (Unit)
        var weatherTempUnitDiv = document.getElementById("weather-temp--unit");
        weatherTempUnitDiv.innerHTML = "°C";
        // Weather Icon
        var dataCurrentIcon = data.currently.icon
        var skycons = new Skycons();
        skycons.set("weather-temp--icon", switchSkycon(dataCurrentIcon));
        skycons.color = iconColor;
        skycons.play();
      }
    });
  });
});