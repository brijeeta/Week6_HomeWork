// variables 
var currentTemp = $('.current-temp');
var currentHumidity = $('.humidity');
var currentWind = $('.wind');
var currentUV = $('.uv-index');
var currentPressure = $('.pressure');
var currentVisibility = $('.visibility');
var currentDewPoint = $('.dew-point');
var currentWeather = $('.current-weather');
var savedCities = document.querySelector(".savedCities");
var searchButton = $('.searchbtnName');
var appId = "ef78318eb7cda868c3a3754d113e2d59";
var BaseURL = "https://api.openweathermap.org/";
var geocodeAPIurl = "https://api.openweathermap.org/geo/1.0/";
var currentDay = moment().format('MM')
var currentHour = moment().format('H');

localStorage.clear();
onPageLoad();

// on page load show data for Delaware Ohio
function onPageLoad() {
    var citiesObj = [{
        "name": "Delaware",
        "lat": "40.2987",
        "lon": "-83.068"
    }];
    localStorage.setItem("cities", JSON.stringify(citiesObj));
    currentWeather.text("Current weather for " + citiesObj[0].name + " - " + moment().format('MMMM Do, YYYY'));
    getWeather(citiesObj[0].lat, citiesObj[0].lon);

}

// function to call baseURL
function getWeather(lat, lon) {
    // console.log(lat);
    // console.log(lon);
    var searchURL = BaseURL + "data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + appId;
    fetch(searchURL)
        .then(response => response.json())
        .then(data => {
            // get weather data
            console.log(data);

            // current temperature and icon
            var tempData = Math.round(data.current.temp);
            var currentIcon = data.current.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + currentIcon + ".png";

            $(".temp-icon").html("<img src='" + iconURL + "'>");
            currentTemp.text("Temperature: " + tempData + "\u00B0");

            var currentWeatherDesc = data.current.weather[0].main;
            $(".weather-desc").text(currentWeatherDesc);

            // current humidity, wind speed, uv index, pressure, visibility, & dewpoint
            var humidity = data.current.humidity;
            currentHumidity.text("Humidity: " + humidity + "%");
            var wind = Math.round(data.current.wind_speed);
            currentWind.text("Wind Speed: " + wind + " mph");
            var uvIndex = data.current.uvi;
            currentUV.text("UV Index: " + uvIndex);
            if (Math.round(uvIndex) <= 2) {
                currentUV.addClass("has-background-primary-dark");
            } else if (Math.round(uvIndex) > 2 && Math.round(uvIndex) <= 5) {
                currentUV.addClass("has-background-warning-dark");
            } else if (Math.round(uvIndex) > 5 && Math.round(uvIndex) <= 7) {
                currentUV.addClass("has-background-info");
            } else if (Math.round(uvIndex) > 7 && Math.round(uvIndex) <= 10) {
                currentUV.addClass("has-background-danger-dark");
            } else {
                currentUV.addClass("has-background-link");
            }
            var pressure = data.current.pressure;
            currentPressure.text("Pressure: " + pressure + " hPa")
            var visibility = data.current.visibility;
            currentVisibility.text("Visibility: " + visibility + " m");
            var dewPoint = Math.round(data.current.dew_point);
            currentDewPoint.text("Dew Point: " + dewPoint + " \u00B0" + "F");

            // next 5 days 
            var date1 = moment().add(1, "days");
            $(".day1").text(date1.format("MM-DD-YY"));
            var day1Icon = data.daily[1].weather[0].icon;
            var dayIconURL1 = "https://openweathermap.org/img/w/" + day1Icon + ".png";
            $(".icon-1").html("<img src='" + dayIconURL1 + "'>");
            var day1Temp = Math.round(data.daily[1].temp.day);
            $(".day1-temp").text(day1Temp + "\u00B0");
            var day1Humidity = data.daily[1].humidity;
            $(".day1-humid").text("Humidity: " + day1Humidity + "%");

            var date2 = moment().add(2, "days");
            $(".day2").text(date2.format("MM-DD-YY"));
            var day2Icon = data.daily[2].weather[0].icon;
            var dayIconURL2 = "https://openweathermap.org/img/w/" + day2Icon + ".png";
            $(".icon-2").html("<img src='" + dayIconURL2 + "'>");
            var day2Temp = Math.round(data.daily[2].temp.day);
            $(".day2-temp").text(day2Temp + "\u00B0");
            var day2Humidity = data.daily[2].humidity;
            $(".day2-humid").text("Humidity: " + day2Humidity + "%");

            var date3 = moment().add(3, "days");
            $(".day3").text(date3.format("MM-DD-YY"));
            var day3Icon = data.daily[3].weather[0].icon;
            var dayIconURL3 = "https://openweathermap.org/img/w/" + day3Icon + ".png";
            $(".icon-3").html("<img src='" + dayIconURL3 + "'>");
            var day3Temp = Math.round(data.daily[3].temp.day);
            $(".day3-temp").text(day3Temp + "\u00B0");
            var day3Humidity = data.daily[3].humidity;
            $(".day3-humid").text("Humidity: " + day3Humidity + "%");

            var date4 = moment().add(4, "days");
            $(".day4").text(date4.format("MM-DD-YY"));
            var day4Icon = data.daily[4].weather[0].icon;
            var dayIconURL4 = "https://openweathermap.org/img/w/" + day4Icon + ".png";
            $(".icon-4").html("<img src='" + dayIconURL4 + "'>");
            var day4Temp = Math.round(data.daily[4].temp.day);
            $(".day4-temp").text(day4Temp + "\u00B0");
            var day4Humidity = data.daily[4].humidity;
            $(".day4-humid").text("Humidity: " + day4Humidity + "%");

            var date5 = moment().add(5, "days");
            $(".day5").text(date5.format("MM-DD-YY"));
            var day5Icon = data.daily[5].weather[0].icon;
            var dayIconURL5 = "https://openweathermap.org/img/w/" + day5Icon + ".png";
            $(".icon-5").html("<img src='" + dayIconURL5 + "'>");
            var day5Temp = Math.round(data.daily[5].temp.day);
            $(".day5-temp").text(day5Temp + "\u00B0");
            var day5Humidity = data.daily[5].humidity;
            $(".day5-humid").text("Humidity: " + day5Humidity + "%");

        });
}


// event listner for search 
$('.searchbtnName').on('click', function(event) {
    cityValue = event.target.parentElement.parentElement.children[0].children[0].value;
    stateValue = event.target.parentElement.parentElement.children[1].children[0].value;
    console.log(cityValue);
    console.log(stateValue);
    var SearchURL = geocodeAPIurl + "direct?q=" + cityValue + "," + stateValue + ",US&appid=" + appId;
    fetch(SearchURL)
        .then(response => response.json())
        .then(data => {
            // reset form values
            cityValue = event.target.parentElement.parentElement.children[0].children[0].value = '';
            stateValue = event.target.parentElement.parentElement.children[1].children[0].value = '';
            // console.log(data);
            var lat = data[0].lat;
            // console.log(lat);
            var lon = data[0].lon;
            // console.log(lon);
            var name = data[0].name;
            // console.log(city);
            // create an object with the name lattitude and longitude
            var obj = {
                    name,
                    lat,
                    lon
                }
                // console.log(obj);

            currentWeather.text("Current weather for " + name + " - " + moment().format('MMMM Do, YYYY'));
            // send object to local storage & create button
            if (localStorage.getItem("AddedCities") === undefined) {
                var cities = JSON.parse(localStorage.getItem("cities") || "[]");
            } else {
                var cities = JSON.parse(localStorage.getItem("AddedCities") || "[]");
            }

            cities.push(obj);
            localStorage.setItem("AddedCities", JSON.stringify(cities));
            createButtons(name);
            getWeather(lat, lon);
        });

})

// to create buttons for saved cities
function createButtons(city) {
    var allButtons = document.querySelectorAll(".savedCities");
    for (i = 0; i < allButtons.length; i++) {
        var savedbtnCities = allButtons[i].innerText;

        if (savedbtnCities.includes(city)) {
            return;
        } else {
            var newCity = document.createElement("button");
            newCity.innerText = city; 
            newCity.classList.add("button",  "is-block",  "has-text-centered", "m-2");
            savedCities.append(newCity);
        }
    }
}

// Set event listener for created buttons to switch between different cities
$('.savedCities').on('click', function(event) {
    var cityName = event.target.textContent;
    // console.log("cityname" + cityName);
    var newRequest = localStorage.getItem("AddedCities");
    var keyObj = JSON.parse(newRequest);

    for (i = 0; i < keyObj.length; i++) {
        if (cityName === keyObj[i].name) {
            var lat = keyObj[i].lat;
            var lon = keyObj[i].lon;
            console.log("lat" + lat);
        }
    }
    currentWeather.text("Current weather for " + cityName + " - " + moment().format('MMMM Do, YYYY'));
    getWeather(lat, lon);
})