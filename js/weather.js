export {bigErrorOmg, displayNewWeather, displayStoredWeather};

let OpenWeatherappId = "15503d995eb403b985f0761f2345534a"

function bigErrorOmg()
{
    alert("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
}

function displayNewWeather(e)
{
    if(!cities.value)
    return;
    let latLon = [];
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cities.value+"&limit=1&appid=15503d995eb403b985f0761f2345534a")
    .then(res => res.json())
    .then(obj =>{
        // console.log(obj)
        latLon.push(obj[0].lat);
        latLon.push(obj[0].lon);
        console.log(obj[0].lat)
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+latLon[0]+"&lon="+latLon[1]+"&appid=" + OpenWeatherappId)
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



            fetch("https://api.unsplash.com/photos/random?query="+cities.value, {headers :{Authorization: "Client-ID jE4dvuuzG4RCh5skxUQ1hSkPhtSmt_Zq-eRcZzCSo-s"}})
            .then(res => res.json())
            .then(unsplash => {
            console.log(unsplash.urls.raw)
            let img = document.createElement('img')
            img.setAttribute("src", unsplash.urls.raw)
            div.appendChild(img)
        })
        })
    })
    // console.log(latLon[1]);
    // fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cities.value + "&APPID=" + OpenWeatherappId)
    .catch(error => console.log(error))
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