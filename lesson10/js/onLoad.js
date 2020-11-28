function onLoad(cityId) {
    const isFriday = new Date().getDay() === 5
    if (isFriday) {
        const pancakes = document.getElementById("pancakes")
        pancakes.setAttribute("style", "display: block");
    }
    document.getElementById('lastUpdated').innerHTML = `Last updated ${document.lastModified}`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=123ae05cdd5cc4084618178c2a325bb1&units=imperial`)
        .then(response => response.json()).then(onWeather)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=123ae05cdd5cc4084618178c2a325bb1&units=imperial`)
        .then(response => response.json()).then(onForecast)
    window.fetch('https://byui-cit230.github.io/weather/data/towndata.json').then(res => res.json())
        .then((response) => {
            const { towns } = response
            const main = document.getElementById("main")
            const filteredResponse = towns.filter(elem => elem.name === "Fish Haven" || elem.name === "Preston" || elem.name === "Soda Springs")
            if (cityId === '5604473') {
                const [preston] = filteredResponse.filter(elem => elem.name === "Preston")
                const { events } = preston
                for (const index in events) {
                    const eventSection = document.createElement('section')
                    const eventTitle = document.createElement('h4')
                    const eventInformation = document.createElement('div')
                    const eventImage = document.createElement('img')
                    const eventDescription = document.createElement("p")
                    const eventDate = document.createElement("span")
                    const [date, title] = events[index].split(":")
                    eventTitle.innerText = title
                    eventDate.innerText = date
                    eventImage.className = "articleImage"
                    eventImage.src = "../lesson6/images/hero-small.jpg"
                    eventDescription.innerText = "Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum"
                    eventInformation.appendChild(eventImage)
                    eventInformation.appendChild(eventDescription)
                    eventSection.appendChild(eventTitle)
                    eventSection.appendChild(eventDate)
                    eventSection.appendChild(eventInformation)
                    main.appendChild(eventSection)
                }
            }
            if (cityId === '5607916') {
                const [sodaSprings] = filteredResponse.filter(elem => elem.name === "Soda Springs")
                const { events } = sodaSprings
                for (const index in events) {
                    const eventSection = document.createElement('section')
                    const eventTitle = document.createElement('h4')
                    const eventInformation = document.createElement('div')
                    const eventImage = document.createElement('img')
                    const eventDescription = document.createElement("p")
                    const eventDate = document.createElement("span")
                    const [date, title] = events[index].split(":")
                    eventTitle.innerText = title
                    eventDate.innerText = date
                    eventImage.className = "articleImage"
                    eventImage.src = "../lesson6/images/hero-small.jpg"
                    eventDescription.innerText = "Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum"
                    eventInformation.appendChild(eventImage)
                    eventInformation.appendChild(eventDescription)
                    eventSection.appendChild(eventTitle)
                    eventSection.appendChild(eventDate)
                    eventSection.appendChild(eventInformation)
                    main.appendChild(eventSection)
                }
            }
            if (cityId === '5585010') {
                const [fishHaven] = filteredResponse.filter(elem => elem.name === "Fish Haven")
                const { events } = fishHaven
                for (const index in events) {
                    const eventSection = document.createElement('section')
                    const eventTitle = document.createElement('h4')
                    const eventInformation = document.createElement('div')
                    const eventImage = document.createElement('img')
                    const eventDescription = document.createElement("p")
                    const eventDate = document.createElement("span")
                    const [date, title] = events[index].split(":")
                    eventTitle.innerText = title
                    eventDate.innerText = date
                    eventImage.className = "articleImage"
                    eventImage.src = "../lesson6/images/hero-small.jpg"
                    eventDescription.innerText = "Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum"
                    eventInformation.appendChild(eventImage)
                    eventInformation.appendChild(eventDescription)
                    eventSection.appendChild(eventTitle)
                    eventSection.appendChild(eventDate)
                    eventSection.appendChild(eventInformation)
                    main.appendChild(eventSection)
                }
            }
        })
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

function onWeather({ weather, main, wind }) {
    const { temp_max, humidity } = main
    const { speed } = wind
    const [weatherJson] = weather
    document.getElementById('description').innerText = weatherJson.description
    document.getElementById('temp_max').innerText = temp_max
    document.getElementById('windchill').innerText = calculateWindchill(temp_max, speed).toFixed(2)
    document.getElementById('humidity').innerText = humidity
    document.getElementById('speed').innerText = speed
}

function calculateWindchill(temperature, windSpeed) {
    return  35.74 + (0.6215* temperature) - (35.75 * Math.pow(windSpeed, 0.16) ) + (0.4275 * temperature * Math.pow(windSpeed, 0.16))
}

function byForecastTime({ dt_txt }) {
    const time = dt_txt.split(" ")[1]
    return time === "18:00:00"
}