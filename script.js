let cities = document.body.querySelector("#cities");
let submit = document.body.querySelector("#submit");
let compareBtn = document.body.querySelector(".compareBtn")
let appId = "15503d995eb403b985f0761f2345534a"
// let storedWeather = 

function bigErrorOmg()
{
    alert("not a valid city you bum")
}

function displayNewWeather(e)
{
    if(!cities.value)
        return ;
    if (e.code === "Enter" || e.pointerType === "mouse")
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cities.value + "&APPID=" + appId)
    .then(res => res.json())
    .then(obj =>{
        if(obj.cod === '404')
        {
            bigErrorOmg();
            return;
        }
        obj.main.temp = Math.ceil(Number(obj.main.temp) - 273.15);
        let div = document.createElement("div");
        
        document.body.querySelector("main").appendChild(div);
        div.innerHTML = obj.name + " " + obj.sys.country + " " + obj.main.temp + "°C";
        window.localStorage.setItem('')
    })
    .catch(error => console.log(error))
}

function compareWeather()
{

}



// function displayStoredWeather()
// {

//     let div = document.createElement("div");
//     document.body.querySelector("main").appendChild(div);

// }

// displayStoredWeather()
compareBtn.addEventListener("click", compareWeather);
cities.addEventListener("keyup", displayNewWeather);
submit.addEventListener("click", displayNewWeather);

console.log (window.localStorage);
// window.localStorage.setItem("name", "arno")
// console.log(window.localStorage);
window.localStorage.removeItem("name")