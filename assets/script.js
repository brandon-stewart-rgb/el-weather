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
var previousSearch = document.querySelector(".buttons");
var dateTime = document.querySelector('#date-time');
const clearButton = document.querySelector(".clear-btn");


button.addEventListener('click',function(e){ 
    e.preventDefault();
    // ignore input if empty
    if(inputValue.value.length < 1) return;

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=739711a5a24c9b8e40f69bb8be0bd03b')
   
    .then(response => response.json())
    .then(data=> {
        var nameValue = data['name']
        var tempValue = Math.round(data['main']['temp'])
        var feelsLikeValue = Math.round(data['main']['feels_like'])
        var descValue = data['weather']['0']['description'] 
        var tempMaxValue = Math.round(data['main']['temp_max'])
        var tempMinValue = Math.round(data['main']['temp_min'])
        var windSpeedValue = Math.round(data['wind']['speed'])
        const {icon} = data.weather[0];
        locationIcon.innerHTML = `<img src="./assets/icons/${icon}.png">`
        cityName.innerHTML = nameValue;
        desc.innerHTML = "Current conditions:  <strong>" +descValue+ "</strong>.";
        temp.innerHTML = "Current Temperature: <strong>" +tempValue+ "</strong><sup>°F</sup>";
        feelsLike.innerHTML = "Feels Like: <strong>" +feelsLikeValue+ "</strong><sup>°F</sup>";
        tempMax.innerHTML = "Max Temp: <strong>" +tempMaxValue+ "</strong><sup>°F</sup>";
        tempMin.innerHTML = "Min Temp: <strong>" +tempMinValue+ "</strong><sup>°F</sup>";
        windSpeed.innerHTML = "Wind Speed: <strong>" +windSpeedValue+ "mph</strong>"; 

        // using RegEx to convert first letter of each word to uppercase
        var searchValue = inputValue.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        // create a button
        previousSearch.innerHTML += 
        `<button class="button is-medium is-info" id="saved-button" onclick='saves(this.value);' value="${searchValue}"> ${searchValue}</button>`
        removeDuplicate();

        // Save the searches to localStorage
        localStorage.setItem('savedButtons', previousSearch.innerHTML);
  
    });

    fetch('https://timezone.abstractapi.com/v1/current_time/?api_key=6630e72c87934bdbbafad365a500bd14&location=' +inputValue.value+'')
    .then(responses => responses.json())
    .then(data=> {
      console.log(data)
      console.log(inputValue.value)

      var currentTime = data['datetime']
      var now = (currentTime);

      function toJSDate (dateTime) {
        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
        var date = dateTime[0].split("-");
        var time = dateTime[1].split(":");
        //(year, month, day, hours, minutes, seconds, milliseconds)
        return new Date(date[0], date[1], date[2], time[0], time[1]);    
        }
        var jsDate = toJSDate(now);
        var dd = jsDate.toLocaleDateString() + " | " + jsDate.toLocaleTimeString();
        dateTime.innerHTML = "Current date/time is:  <strong>" +dd+ "</strong>.";

    }); 

        
      // get latitude and longitude from current input value...
    fetch('https://api.positionstack.com/v1/forward?access_key=8b6705bd3db1ed3c15005b1f93926e8e&query='+inputValue.value+'')
    
    .then(responses => responses.json())
    .then(data=> {
        var latitudeValue = data['data']['0']['latitude']
        var longitudeValue = data['data']['0']['longitude']

    
    
      
       fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' +latitudeValue+ '&lon=' +longitudeValue+ '&units=imperial&exclude=hourly,minutely,alerts&appid=e663d07dec9b8f87ac31936c9b8c2907')

       .then(responses => responses.json())
       .then(data=> {

        var forecastEl = document.getElementsByClassName("forecast");
        // empty string
        var forecastDay = "";
        // clears out previous search contents of #sevenDay
        clearBox();
        // loops over days and for each creates the following HTML along with correct icons, days and temp
        data.daily.forEach((value,index) => {
            if(index > 0) {
              // convert time and convert date to day
              var dayName = new Date(value.dt * 1000).toLocaleDateString("en" ,{
                weekday: "long"// shows full word for day of week
              });
              var icon = value.weather[0].icon;
              var temp = value.temp.day.toFixed(0);

              forecastDay = 
              `<div class="forecast-day column has-text-centered ">
                  <div class="is-flex is-horizontal-center is-1 box ">
                    <figure class="image is-48x48">
                        <div class="five-day-icon"><img src="./assets/icons/${icon}.png" /></div>
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

        });

        // removes hidden classes on click
        const el = document.querySelector('.card');
          if (el.classList.contains("is-hidden")) {
          el.classList.remove("is-hidden");
        }
        const clearButton = document.querySelector('.clear-btn');
          if (clearButton.classList.contains("is-hidden")) {
          clearButton.classList.remove("is-hidden");
        }
           
     }); 

    // pause for 2.2 seconds then clear search input. bam.
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    } 
    sleep(2000).then(() => { submitForm(); });         
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
function saves(val){
  // places value of button into search input
  document.getElementById('search-input').value = val;  
  // clicks button of search input to perform a search
  document.getElementById('button').click();
};

// keeps buttons from piling up as duplicate searches
function removeDuplicate() {
    const buttonBlocks = new Set();
    for (const button of document.querySelectorAll('#saved-button')) {
        if (buttonBlocks.has(button.textContent.trim())) {
            button.parentNode.removeChild(button);
        }
        buttonBlocks.add(button.textContent.trim());
    }
};

// make search enter responsive
var input = document.getElementById("search-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button").click();
  }
});


 // Check for saved button items
 var saved = localStorage.getItem('savedButtons');
 // If there are any saved items, update our all the buttons
 if (saved) {
  previousSearch.innerHTML = saved;
};

// clear the local storage localStorage.clear(); via button to clear the calendar and reload the page location.reload()
clearButton.addEventListener('click',function(){
  localStorage.clear();
  location.reload();
});