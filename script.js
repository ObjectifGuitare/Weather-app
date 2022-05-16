let cities = document.body.querySelector("#cities");
let submit = document.body.querySelector("#submit");
let previousCities = [];

function displayWeather()
{

}

cities.addEventListener("keyup", displayWeather)
submit.addEventListener("click", displayWeather);