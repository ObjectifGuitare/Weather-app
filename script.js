let cities = document.body.querySelector("#cities");
let submit = document.body.querySelector("#submit");
let compareBtn = document.body.querySelector(".compareBtn")
let clearPrevious = document.body.querySelector("#clear")
let OpenWeatherappId = "15503d995eb403b985f0761f2345534a"
let cityOne = document.body.querySelector("#city1")
let cityTwo = document.body.querySelector("#city2")
// let storedWeather = { ...localStorage }



function bigErrorOmg()
{
    alert("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
}

// a function that smells like wet poop
// function getLatLon(city)
// {
//     let latLon = [];
//     fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=15503d995eb403b985f0761f2345534a")
//     .then(res => res.json())
//     .then(obj =>{
//         // console.log(obj)
//         latLon.push(obj[0].lat);
//         latLon.push(obj[0].lon);
//         console.log(obj[0].lat)
        
//     })
//     // console.log(latLon)
//     return latLon;
// }

function displayNewWeather(e)
{
    if(!cities.value)
    return;
    let latLon = [];
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cities.value+"&limit=1&appid=15503d995eb403b985f0761f2345534a")
    .then(res => res.json())
    .then(obj =>{
        // console.log(obj)
        latLon.push(obj[0].lat);
        latLon.push(obj[0].lon);
        console.log(obj[0].lat)
        fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+latLon[0]+"&lon="+latLon[1]+"&appid=" + OpenWeatherappId)
        .then(res => { 
            let a = res.json()
            console.log(typeof(a))
            return a
        })
        .then(obj =>{
            console.log(obj);
            if(obj.cod === '404')
            {
                bigErrorOmg();
                return;
            }
            obj.list[0].main.temp = Math.ceil(Number(obj.list[0].main.temp) - 273.15);
            obj.list[1].main.temp = Math.ceil(Number(obj.list[1].main.temp) - 273.15);
            obj.list[2].main.temp = Math.ceil(Number(obj.list[2].main.temp) - 273.15);
            obj.list[3].main.temp = Math.ceil(Number(obj.list[3].main.temp) - 273.15);
            obj.list[4].main.temp = Math.ceil(Number(obj.list[4].main.temp) - 273.15);
            let div = document.createElement("div");
            
            document.body.querySelector("main").appendChild(div);
            div.innerHTML = obj.city.name + " " + obj.list[0].main.temp + "°C" + " "+ obj.list[1].main.temp + "°C" + " "+ obj.list[2].main.temp + "°C" + " "+ obj.list[3].main.temp + "°C" + " "+ obj.list[4].main.temp + "°C" + " ";
            window.localStorage.setItem(cities.value, JSON.stringify(obj))
        })
    })
    // console.log(latLon[1]);
    // fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cities.value + "&APPID=" + OpenWeatherappId)
    .catch(error => console.log(error))
}

//another function that smells like wet poop but it works
function compareWeather()
{
    if(!cityOne.value || !cityTwo.value)
        return ;
    let cityOneTemp;
    let cityTwoTemp;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityOne.value+"&limit=1&appid=15503d995eb403b985f0761f2345534a")
    .then(resOne => resOne.json())
    .then(objOne =>{
        let latLon = [];
        latLon.push(objOne[0].lat);
        latLon.push(objOne[0].lon);
        fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+latLon[0]+"&lon="+latLon[1]+"&appid=" + OpenWeatherappId)
        .then(res => res.json())
        .then(objOne =>{
            cityOneTemp =  Math.ceil(Number(objOne.list[0].main.temp) - 273.15);
        })
        .then(() =>{
            fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityTwo.value+"&limit=1&appid=15503d995eb403b985f0761f2345534a")
            .then(resTwo => resTwo.json())
            .then(objTwo =>{
                let latLon = [];
                latLon.push(objTwo[0].lat);
                latLon.push(objTwo[0].lon);
                fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+latLon[0]+"&lon="+latLon[1]+"&appid=" + OpenWeatherappId)
                .then(res => res.json())
                .then(objTwo =>{
                    cityTwoTemp =  Math.ceil(Number(objTwo.list[0].main.temp) - 273.15);
                })
                .then(()=>{
                    if(cityOneTemp < cityTwoTemp)
                        compareBtn.innerHTML = "il fait plus chaud dans cityTwo"
                    else
                    compareBtn.innerHTML = "il fait plus chaud dans cityOne"
                })
            })
        })
    })

}

function displayStoredWeather()
{
    let places = []
    let keys = Object.keys(localStorage)
    let i = keys.length;
    while ( i-- ) {
        places.push( localStorage.getItem(keys[i]) );
    }

    for(place of places)
    {
        let div = document.createElement("div");
        document.body.querySelector("main").appendChild(div);
        div.setAttribute("class", "stored");
        let jsoned = JSON.parse(place)
        div.innerHTML = jsoned.city.name + " " + jsoned.list[0].main.temp + "°C"+ " " + jsoned.list[1].main.temp + "°C"+ " " + jsoned.list[2].main.temp + "°C"+ " " + jsoned.list[3].main.temp + "°C"+ " " + jsoned.list[4].main.temp + "°C";
    }
}


displayStoredWeather()
compareBtn.addEventListener("click", compareWeather);
submit.addEventListener("click", displayNewWeather);
cities.addEventListener("keyup", (e)=>{
    if(e.code === "Enter")
        displayNewWeather(e)});
clearPrevious.addEventListener("click", () => {
    window.localStorage.clear()
    for (let elem of document.body.querySelectorAll(".stored"))
        elem.remove()
})
// console.log (window.localStorage);
// window.localStorage.setItem("name", "arno")
// console.log(window.localStorage);