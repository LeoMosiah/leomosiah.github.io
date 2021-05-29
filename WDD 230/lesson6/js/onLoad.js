function onLoad() {
    const isFriday = new Date().getDay() === 5
    if (isFriday) {
        const pancakes = document.getElementById("pancakes")
        pancakes.setAttribute("style", "display: block");
    }
    document.getElementById('lastUpdated').innerHTML = `Last updated ${document.lastModified}`;
}