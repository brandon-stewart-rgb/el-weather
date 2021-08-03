
// https://bithacker.dev/fetch-weather-openweathermap-api-javascript


var button = document.getElementById('button');
// targets all of the classes in the input element!
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
var fiveDayCity = document.querySelector('#five-day-city');

var fiveDayIcon = document.querySelector('.five-day-icon')




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

    })

        
    // get latitude and longitude from current input value
   fetch('http://api.positionstack.com/v1/forward?access_key=bd7525d294dee49bf6525fc33d3c9013&query='+inputValue.value+'')
   
   .then(responses => responses.json())
   .then(data=> {
      var latitudeValue = data['data']['0']['latitude']
      var longitudeValue = data['data']['0']['longitude']
      

       fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' +latitudeValue+ '&lon=' +longitudeValue+ '&units=imperial&exclude=hourly,minutely,alerts&appid=e663d07dec9b8f87ac31936c9b8c2907')

       .then(responses => responses.json())
       .then(data=> {
        var forecastEl = document.getElementsByClassName("forecast");
        // var sevenDay = document.getElementById('seven-day')
        // sevenDay.innerHTML = "";
        // empty string
        var forecastDay = "";
        // clears out previous search contents of #sevenDay
        clearBox();
       
        data.daily.forEach((value,index) => {
          if(index > 0) {
            // convert time and convert date to day
            var dayName = new Date(value.dt * 1000).toLocaleDateString("en" ,{
              weekday: "short"// shortens day of week to three letters
            });

            var icon = value.weather[0].icon;
            var temp = value.temp.day.toFixed(0);

           
            forecastDay = 
            
            `<div class="forecast-day column has-text-centered">
                <div class="is-flex is-horizontal-center">
                   <figure class="image is-48x48">
                          <div class="five-day-icon"><img src="/assets/icons/${icon}.png" /></div>
                   </figure>
                </div>
						    <div class="is-size-5">${temp}<sup>°F</sup></div>
                        <p>${dayName}</p>
					   </div>`;
             
            
            // inserts nodes into DOM tree at specified position
					forecastEl[0].insertAdjacentHTML('beforeend', forecastDay);
         

          
         
          }
        });
 
        


          // using RegEx to convert first letter of each word to uppercase
          var fiveDayCityValue = inputValue.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
          fiveDayCity.innerHTML = "Seven day forecast for <strong>" +fiveDayCityValue+ "</strong>";
          
           
         });


       const el = document.querySelector('.card');
            if (el.classList.contains("is-hidden")) {
            el.classList.remove("is-hidden");
      }
        
     }); 

});




function clearBox(sevenDay) {
  var div = document.getElementById("sevenDay");
    
  while(div.firstChild) {
      div.removeChild(div.firstChild);
  }
}











