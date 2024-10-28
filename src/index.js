
const apiKey = "ta004a4a3b736802do35c5853a06aff7";

function searchCity(city) {
    getCurrentTemperature(city);
    getForecast(city);
}

function getCurrentTemperature(city) {
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            const cityElement = document.querySelector('#city');
            const temperatureElement = document.querySelector('.weather-app-temperature');
            const detailsElement = document.querySelector('.weather-app-details');
            const iconElement = document.querySelector('.weather-app-icon');

            cityElement.innerHTML = data.city;
            temperatureElement.innerHTML = `${data.temperature.current}°C`;
            detailsElement.innerHTML = `${data.time}, ${data.condition.description}<br />
                Humidity: <strong>${data.temperature.humidity}%</strong>, Wind: <strong>${data.wind.speed} km/h</strong>`;

            const iconUrl = data.condition.icon_url;
            iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
        })
        .catch(error => {
            console.error("Error fetching weather ", error);
        });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search-form-input');
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(day.temperature.maximum)}º</strong>
                        </div>
                        <div class="weather-forecast-temperature">
                            ${Math.round(day.temperature.minimum)}º
                        </div>
                    </div>
                </div>
            `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

const searchFormElement = document.querySelector('#search-form');
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");