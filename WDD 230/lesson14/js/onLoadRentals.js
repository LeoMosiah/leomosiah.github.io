function onLoadHome() {
    fetch('./data/rentals.json')
        .then(response => response.json()).then(onRentals)
}

function onRentals({ options }) {
    const container = document.getElementById('rentals')
    container.innerHTML = options.map(option => `
        <div>
            <div>
                <div>
                    <h2>${option.rentalType}</h2>
                </div>
                <img style="max-height: 380px" src=${option.imgSrc} alt="Image">
            </div>
            <div>
                <div>
                    <p style="color: white">Max Passengers: ${option.maxPersons}</p>
                    <p style="color: white">Reservations Prices: </p>
                    <p style="color: white">Half Day: $ ${option.reservation.half} | Full Day: $ ${option.reservation.full}</p>
                    <p style="color: white">Walk In Prices: </p>
                    <p style="color: white">Half Day: $ ${option.walkIn.half} | Full Day: $ ${option.walkIn.full}</p>
                </div>
                <a href="reservations.html">Reserve Now</a>
            </div>
        </div>`).join("")
}

onLoadHome()
