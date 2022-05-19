import {rules} from "./chart_obj.js"

let OpenWeatherappId = "15503d995eb403b985f0761f2345534a"
let tempOne = 0;
let tempTwo = 0; 
let tempThree = 0; 
let tempFour = 0; 
let tempFive = 0;
export {tempOne, tempTwo, tempThree, tempFour, tempFive};

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
            tempOne = Math.ceil(Number(obj.list[0].main.temp) - 273.15);
            tempTwo = Math.ceil(Number(obj.list[1].main.temp) - 273.15);
            tempThree = Math.ceil(Number(obj.list[2].main.temp) - 273.15);
            tempFour = Math.ceil(Number(obj.list[3].main.temp) - 273.15);
            tempFive = Math.ceil(Number(obj.list[4].main.temp) - 273.15);
            rules.data.datasets[0].data = [tempOne, tempTwo, tempThree, tempFour, tempFive];
            if(document.body.querySelector("#graph"))
                document.body.querySelector("#graph").remove()
            let canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            canvas.setAttribute("id", "graph");
            const ctx = document.getElementById('graph').getContext('2d');
            const myChart = new Chart(ctx, rules)
            
            let div = document.createElement("div");
            
            document.body.querySelector("main").appendChild(div);
            div.innerHTML = obj.city.name + " " + tempOne + "°C" + " "+ tempTwo + "°C" + " "+ tempThree + "°C" + " "+ tempFour + "°C" + " "+ tempFive + "°C" + " ";
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

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );


export {bigErrorOmg, displayNewWeather, displayStoredWeather};

