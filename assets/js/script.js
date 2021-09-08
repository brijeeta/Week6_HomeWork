// variables 
var currentTemp = $('.current-temp');
var currentHumidity = $('.humidity');
var currentWind = $('.wind');
var currentUV = $('.uv-index');
var currentPressure = $('.pressure');
var currentVisibility = $('.visibility');
var currentDewPoint = $('.dew-point');
var currentWeather = $('.current-weather');
var Citylist = [JSON.parse(localStorage.getItem("cities"))];
var savedCities = document.querySelector(".savedCities");
var searchButton = $('.searchbtnName');
var AppId = "ef78318eb7cda868c3a3754d113e2d59";
var BaseURL = "https://api.openweathermap.org/";

var currentDay = moment().format('MM')
var currentHour = moment().format('H');

onPageLoad();

// on page load show data for Delaware Ohio
function onPageLoad() {
    var name = "Delaware,Ohio"
    var lat = 40.2987;
    var lon = -83.068;
    currentWeather.text("Current weather for Delaware,Ohio - " + moment().format('MMMM Do, YYYY'));
    localStorage.setItem("cities", `{"city":${name},"obj":{"lat":${lat},"lon":${lon}}}`);
    getWeather(lat, lon);
    localStorage.clear();
}


function getWeather(lat, lon) {
    console.log(lat);
    console.log(lon);
    let searchURL = BaseURL + "data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + AppId;
    fetch(searchURL)
        .then(response => response.json())
        .then(data => {
            // get weather data
            console.log(data);

            // current temperature and icon
            let tempData = Math.round(data.current.temp);
            let currentIcon = data.current.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";

            $(".temp-icon").html("<img src='" + iconURL + "'>");
            currentTemp.text("Temperature: " + tempData + "\u00B0");

            let currentWeatherDesc = data.current.weather[0].main;
            $(".weather-desc").text(currentWeatherDesc);

            // current humidity, wind speed, uv index, pressure, visibility, & dewpoint
            let humidity = data.current.humidity;
            currentHumidity.text("Humidity: " + humidity + "%");
            let wind = Math.round(data.current.wind_speed);
            currentWind.text("Wind Speed: " + wind + " mph");
            let uvIndex = data.current.uvi;
            currentUV.text("UV Index: " + uvIndex);
            if (Math.round(uvIndex) <= 2) {
                currentUV.addClass("green");
            } else if (Math.round(uvIndex) > 2 && Math.round(uvIndex) <= 5) {
                currentUV.addClass("yellow");
            } else if (Math.round(uvIndex) > 5 && Math.round(uvIndex) <= 7) {
                currentUV.addClass("orange");
            } else if (Math.round(uvIndex) > 7 && Math.round(uvIndex) <= 10) {
                currentUV.addClass("red");
            } else {
                currentUV.addClass("purple");
            }
            let pressure = data.current.pressure;
            currentPressure.text("Pressure: " + pressure + " hPa")
            let visibility = data.current.visibility;
            currentVisibility.text("Visibility: " + visibility + " m");
            let dewPoint = Math.round(data.current.dew_point);
            currentDewPoint.text("Dew Point: " + dewPoint + " \u00B0" + "F");

            // next 5 days 
            let date1 = moment().add(1, "days");
            $(".day1").text(date1.format("MM-DD-YY"));
            let day1Icon = data.daily[1].weather[0].icon;
            let dayIconURL1 = "http://openweathermap.org/img/w/" + day1Icon + ".png";
            $(".icon-1").html("<img src='" + dayIconURL1 + "'>");
            let day1Temp = Math.round(data.daily[1].temp.day);
            $(".day1-temp").text(day1Temp + "\u00B0");
            let day1Humidity = data.daily[1].humidity;
            $(".day1-humid").text("Humidity: " + day1Humidity + "%");

            let date2 = moment().add(2, "days");
            $(".day2").text(date2.format("MM-DD-YY"));
            let day2Icon = data.daily[2].weather[0].icon;
            let dayIconURL2 = "http://openweathermap.org/img/w/" + day2Icon + ".png";
            $(".icon-2").html("<img src='" + dayIconURL2 + "'>");
            let day2Temp = Math.round(data.daily[2].temp.day);
            $(".day2-temp").text(day2Temp + "\u00B0");
            let day2Humidity = data.daily[2].humidity;
            $(".day2-humid").text("Humidity: " + day2Humidity + "%");

            let date3 = moment().add(3, "days");
            $(".day3").text(date3.format("MM-DD-YY"));
            let day3Icon = data.daily[3].weather[0].icon;
            let dayIconURL3 = "http://openweathermap.org/img/w/" + day3Icon + ".png";
            $(".icon-3").html("<img src='" + dayIconURL3 + "'>");
            let day3Temp = Math.round(data.daily[3].temp.day);
            $(".day3-temp").text(day3Temp + "\u00B0");
            let day3Humidity = data.daily[3].humidity;
            $(".day3-humid").text("Humidity: " + day3Humidity + "%");

            let date4 = moment().add(4, "days");
            $(".day4").text(date4.format("MM-DD-YY"));
            let day4Icon = data.daily[4].weather[0].icon;
            let dayIconURL4 = "http://openweathermap.org/img/w/" + day4Icon + ".png";
            $(".icon-4").html("<img src='" + dayIconURL4 + "'>");
            let day4Temp = Math.round(data.daily[4].temp.day);
            $(".day4-temp").text(day4Temp + "\u00B0");
            let day4Humidity = data.daily[4].humidity;
            $(".day4-humid").text("Humidity: " + day4Humidity + "%");

            let date5 = moment().add(5, "days");
            $(".day5").text(date5.format("MM-DD-YY"));
            let day5Icon = data.daily[5].weather[0].icon;
            let dayIconURL5 = "http://openweathermap.org/img/w/" + day5Icon + ".png";
            $(".icon-5").html("<img src='" + dayIconURL5 + "'>");
            let day5Temp = Math.round(data.daily[5].temp.day);
            $(".day5-temp").text(day5Temp + "\u00B0");
            let day5Humidity = data.daily[5].humidity;
            $(".day5-humid").text("Humidity: " + day5Humidity + "%");

        });
}