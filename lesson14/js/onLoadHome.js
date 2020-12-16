function byForecastTime({ dt_txt }) {
    const time = dt_txt.split(" ")[1]
    return time === "18:00:00"
}

function onLoadHome() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=123ae05cdd5cc4084618178c2a325bb1&units=imperial`)
        .then(response => response.json()).then(onWeather)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=123ae05cdd5cc4084618178c2a325bb1&units=imperial`)
        .then(response => response.json()).then(onForecast)
}

function onForecast({ list }) {
    const daysOfTheWeek = {
        0: 'Wed',
        1: 'Thu',
        2: 'Fri',
        3: 'Sat',
        4: 'Sun',
    }
    const container = document.getElementById('forecast')
    list.filter(byForecastTime).forEach((forecast, index) => {
        const title = document.createElement('h4')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const caption = document.createElement('figure')
        title.innerText = daysOfTheWeek[index]
        img.src = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
        img.alt = `https://openweathermap.org/img/w/${forecast.main.temp}`
        caption.innerText = `${forecast.main.temp} ℉`
        figure.appendChild(title)
        figure.appendChild(img)
        figure.appendChild(caption)
        container.appendChild(figure)
    })
}

function onWeather({ weather, main }) {
    const container = document.getElementById('weather')
    const { temp_max, humidity } = main
    const [weatherJson] = weather
    container.innerHTML = `
        <p style="text-transform: capitalize">${weatherJson.description}</p>
        <p>${temp_max} ºF</p>
        <p>${humidity} %</p>
    `
}

onLoadHome()
