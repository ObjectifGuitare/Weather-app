let cities = document.body.querySelector("#cities");
let submit = document.body.querySelector("#submit");
let appId = "15503d995eb403b985f0761f2345534a"

function displayWeather(e)
{
    if (e.code === "Enter" || e.pointerType === "mouse")
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + "brussels" +"," + "be" + "&APPID=" + appId)
    .then(res => res.json())
    .then(obj =>{
        obj.main.temp = Math.ceil(Number(obj.main.temp) - 273.15);
        let div = document.createElement("div");
        document.body.querySelector("main").appendChild(div);
        div.innerHTML = obj.name + " " + obj.sys.country + " " + obj.main.temp + "°C";
    })
}

cities.addEventListener("keyup", displayWeather)
submit.addEventListener("click", displayWeather);