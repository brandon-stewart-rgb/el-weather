
// https://bithacker.dev/fetch-weather-openweathermap-api-javascript


var button = document.getElementById('button');
// targets all of the classes in the input element!
var inputValue = document.querySelector('.inputValue, .input, .is-medium');
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

var previousSearch = document.querySelector('#previous-search');




button.addEventListener('click',function(){

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=739711a5a24c9b8e40f69bb8be0bd03b')

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
     
        locationIcon.innerHTML = `<img src="/assets/icons/${icon}.png">`
        cityName.innerHTML = nameValue;
        desc.innerHTML = "Current conditions:  <strong>" +descValue+ "</strong>.";
        temp.innerHTML = "Current Temperature: <strong>" +tempValue+ "</strong><sup>°F</sup>";
        feelsLike.innerHTML = "Feels Like: <strong>" +feelsLikeValue+ "</strong><sup>°F</sup>";
        tempMax.innerHTML = "Max Temp: <strong>" +tempMaxValue+ "</strong><sup>°F</sup>";
        tempMin.innerHTML = "Min Temp: <strong>" +tempMinValue+ "</strong><sup>°F</sup>";
        windSpeed.innerHTML = "Wind Speed: <strong>" +windSpeedValue+ "mph</strong>";

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
              weekday: "long"// shortens day of week to three letters
            });

            var icon = value.weather[0].icon;
            var temp = value.temp.day.toFixed(0);

           
            forecastDay = 
            
            `<div class="forecast-day column has-text-centered ">
                <div class="is-flex is-horizontal-center is-1 box ">
                   <figure class="image is-48x48">
                          <div class="five-day-icon"><img src="/assets/icons/${icon}.png" /></div>
                   </figure>
                </div>
						    <div class="is-size-6">${temp}<sup>°F</sup></div>
                  <p><strong >${dayName}</strong></p>
					   </div>`;
              
            // inserts nodes into DOM tree at specified position
					forecastEl[0].insertAdjacentHTML('beforeend', forecastDay);    
         
          }
        });
 

          // using RegEx to convert first letter of each word to uppercase
          var fiveDayCityValue = inputValue.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
          fiveDayCity.innerHTML = "Seven day forecast for <strong>" +fiveDayCityValue+ "</strong>";
   
          // add previous searches
          var searchEl = document.querySelector(".buttons");
          var previousSearch = "";
          previousSearch = `<button class="button is-info is-small is-fullwidth is-outlined" id="saved-button" onclick='saved(this.value);'  value="${fiveDayCityValue}" >${fiveDayCityValue}</button>`
          searchEl.insertAdjacentHTML('beforeend', previousSearch);
          removeDuplicate();
          
        

           
         });


       const el = document.querySelector('.card');
            if (el.classList.contains("is-hidden")) {
            el.classList.remove("is-hidden");
      }


      const btn = document.querySelector('.buttons');
      if (btn.classList.contains("is-hidden")) {
      btn.classList.remove("is-hidden");
      }

      
        
     }); 


     // pause for 2.5 seconds then clear search input. bam.
     function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    sleep(2500).then(() => { submitForm(); });



     

});



// function to clear seven day div to keep from stacking multiple forecasts on top of each other
function clearBox(sevenDay) {
  var div = document.getElementById("sevenDay"); 
  while(div.firstChild) {
      div.removeChild(div.firstChild);
  }
};


// clear search form function
function submitForm() {
  $('input[type="text"]').val('');
};


// function is placed within recent search buttons
function saved(val){
  // places value of button into search input
  document.getElementById('search-input').value = val;  
  // clicks button of search input to perform a search
  document.getElementById('button').click();
};


// keeps buttons from piling up as duplicate searches
function removeDuplicate() {

    const st = new Set();
    for (const button of document.querySelectorAll('#saved-button')) {
        if (st.has(button.textContent.trim())) {
            button.parentNode.removeChild(button);
        }
        st.add(button.textContent.trim());
    }

}
