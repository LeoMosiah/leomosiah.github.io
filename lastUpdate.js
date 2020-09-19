function lastUpdate() {
    document.getElementById('lastUpdated').innerHTML = `Last updated ${document.lastModified}`;
    document.getElementById('year').innerHTML = new Date().getFullYear();
}