
// https://bithacker.dev/fetch-weather-openweathermap-api-javascript


var button = document.getElementById('button');
// targets all of the classes in the input element...wow!
var inputValue = document.querySelector('.inputValue, .input, is-medium');
var cityName = document.querySelector('#cityName');
var desc = document.querySelector('#desc');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var feelsLike = document.querySelector('#feels-like');
var tempMax = document.querySelector('#max-temp');
var tempMin = document.querySelector('#min-temp');
var windSpeed = document.querySelector('#wind-speed');
let locationIcon = document.querySelector('.weather-icon');
var fiveDayCity = document.querySelector('#five-day-city')
// let card = document.querySelector(".card");


button.addEventListener('click',function(){
     

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=739711a5a24c9b8e40f69bb8be0bd03b' )

    // promise
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data=> {

  			// current temperature
        var nameValue = data['name']
        var tempValue = Math.round(data['main']['temp'])
        var feelsLikeValue = Math.round(data['main']['feels_like'])
        // data weather and the 0 object
        var descValue = data['weather']['0']['description'] 

        var tempMaxValue = Math.round(data['main']['temp_max'])

        var tempMinValue = Math.round(data['main']['temp_min'])

        var windSpeedValue = Math.round(data['wind']['speed'])

        const {icon} = data.weather[0];


        // weather icon
        locationIcon.innerHTML = `<img src="/assets/icons/${icon}.png">`
        // city
        cityName.innerHTML = nameValue;
        // description
        desc.innerHTML = "Currently condition is:  <strong>" + descValue + "</strong>.";
        // temperature 
        temp.innerHTML = "Current Temperature: <strong>" +  tempValue + "</strong>°<small>F</small>";
        // feels like
        feelsLike.innerHTML = "Feels Like: <strong>" + feelsLikeValue + "</strong>°<small>F</small>";
        // feels like
        tempMax.innerHTML = "Max Temp: <strong>" + tempMaxValue + "</strong>°<small>F</small>";
        // feels like
        tempMin.innerHTML = "Min Temp: <strong>" + tempMinValue + "</strong>°<small>F</small>";
        // feels like
        windSpeed.innerHTML = "Wind Speed: <strong>" + windSpeedValue + "mph</strong>";

       



        // console.log(data)
    })
        // reusing input value for city search
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&units=imperial&appid=e663d07dec9b8f87ac31936c9b8c2907' )

    .then(responses => responses.json())

    .then(data=> {

        var fiveDayCityValue = data['city']['name']
        
        fiveDayCity.innerHTML = "Five day forecast for <strong>" +fiveDayCityValue+ "</strong>";
        console.log(data)
        
      });


    // // error catch
    // .catch(err => alert("Wrong City Name!"))

    const el = document.querySelector('.card');
         if (el.classList.contains("is-hidden")) {
         el.classList.remove("is-hidden");
   }
     

});







//   function weatherBalloon( cityID ) {
//     var key = '739711a5a24c9b8e40f69bb8be0bd03b';
//     fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)  
//     .then(function(resp) { return resp.json() }) // Convert data to json
//     .then(function(data) {
//       drawWeather(data);
//     })
//     .catch(function() {
//       // catch any errors
//     });
//   };
  
//   window.onload = function() {
//     weatherBalloon( 6167865 );
//   };

//   function drawWeather( d ) {
// 	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
// 	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
// 	var description = d.weather[0].description;
	
// 	document.getElementById('description').innerHTML = description;
// 	document.getElementById('temp').innerHTML = celcius + '&deg;';
// 	document.getElementById('location').innerHTML = d.name;
	
// 	if( description.indexOf('rain') > 0 ) {
//   	document.body.className = 'rainy';
//   } else if( description.indexOf('cloud') > 0 ) {
//   	document.body.className = 'cloudy';
//   } else if( description.indexOf('sunny') > 0 ) {
//   	document.body.className = 'sunny';
//   }
// };