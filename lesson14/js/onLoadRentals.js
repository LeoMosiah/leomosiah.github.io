function onLoadHome() {
    fetch('./data/rentals.json')
        .then(response => response.json()).then(res => console.log(res))
}
onLoadHome()
