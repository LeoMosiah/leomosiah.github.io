function onLoad() {
    document.getElementById('lastUpdated').innerHTML = `Last updated ${document.lastModified}`;
    window.fetch('https://byui-cit230.github.io/weather/data/towndata.json').then(res => res.json())
        .then((response) => {
            const { towns } = response
            const filteredResponse = towns.filter(elem => elem.name === "Fish Haven" || elem.name === "Preston" || elem.name === "Soda Springs")
            const townsSection = document.getElementById("townsSection")
            for (const index in filteredResponse) {
                const townCard = document.createElement('div')
                const townInformation = document.createElement('div')
                const townImage = document.createElement('div')
                const townName = document.createElement("h3")
                const townsMotto = document.createElement("span")
                const yearFounded = document.createElement("p")
                const currentPopulation = document.createElement("p")
                const averageRainfall = document.createElement("p")
                const picture = document.createElement("picture")
                const mediumImage = document.createElement("source")
                const largeImage = document.createElement("source")
                const image = document.createElement("img")
                townName.innerText = filteredResponse[index].name
                townsMotto.innerText = filteredResponse[index].motto
                yearFounded.innerText = `Year Founded: ${filteredResponse[index].yearFounded}`
                currentPopulation.innerText = `Population: ${filteredResponse[index].currentPopulation}`
                averageRainfall.innerText = `Annual Rain Fall: ${filteredResponse[index].averageRainfall}`
                image.src = "../lesson6/images/hero-small.jpg"
                mediumImage.srcset = "../lesson6/images/hero-medium.jpg"
                mediumImage.media = "(min-width: 768px)"
                largeImage.srcset = "../lesson6/images/hero-large.jpg"
                largeImage.media = "(min-width: 1024px)"
                picture.appendChild(largeImage)
                picture.appendChild(mediumImage)
                picture.appendChild(image)
                townInformation.appendChild(townName)
                townInformation.appendChild(townsMotto)
                townInformation.appendChild(yearFounded)
                townInformation.appendChild(currentPopulation)
                townInformation.appendChild(averageRainfall)
                townImage.appendChild(picture)
                townCard.appendChild(townInformation)
                townCard.appendChild(townImage)
                townsSection.appendChild(townCard)
            }
        })
}