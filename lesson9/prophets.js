const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {

        const prophets = jsonObject['prophets'];
        for (const index in prophets) {


            const card = document.createElement('section');
            const h2 = document.createElement('h2');
            const birthdate = document.createElement('p');
            const birthplace = document.createElement('p');
            const portrait = document.createElement('img');



            h2.textContent = prophets[index].name + ' ' + prophets[index].lastname;
            birthdate.textContent = "Day of Birth: " + prophets[index].birthdate;
            birthplace.textContent = "Place of Birth: " + prophets[index].birthplace;
            portrait.setAttribute('src', prophets[index].imageurl);

            card.appendChild(h2);
            card.appendChild(birthdate);
            card.appendChild(birthplace);
            card.appendChild(portrait);

            document.querySelector('div.cards').appendChild(card);
        }
    });