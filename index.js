const api = {
    key: `2cfd4fc47aa93e151ce61ffed8a27c27
    `,
    baseUrl: "https://api.openweathermap.org/data/2.5/",
}

const searchInput = document.querySelector('.search-input');

let city = document.querySelector('.left-top .countries');

searchInput.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getResults(searchInput.value);
        console.log(searchInput.value);

        if (e.value === undefined) {
            city.innerHTML = 'Undefined'
        }
    }


}


function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    // let city = document.querySelector('.left-top .countries');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.left-top .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temprature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector('.weather-name');
    weatherEl.innerHTML = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low-temp');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(s) {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}