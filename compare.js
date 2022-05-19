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