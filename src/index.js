const apikey = "a957a90b9a361bae582473445e32cf79";

function searchCity(city) {
    getCurrentTemperature(city);
}

function getCurrentTemperature(cityName) {
    const options = {
        method: "GET",
        url: `https://api.weatherstack.com/current?access_key=${apikey}`,
        params: {
            query: cityName,
        },
        url: `https://api.weatherstack.com/current?access_key=${apikey}&query=${cityName}`, 
    };

    axios(options)
        .then(response => {
            const data = response.data;
            updateWeatherUI(data);
        })
        .catch(error => {
            console.error("Error fetching the weather data", error);
            document.querySelector('#city').innerHTML = "City not found";
        });
}

function updateWeatherUI(data) {
    const cityElement = document.querySelector('#city');
    const temperatureElement = document.querySelector('.weather-app-temperature');
    const detailsElement = document.querySelector('.weather-app-details');
    const iconElement = document.querySelector('.weather-app-icon');
  
    cityElement.innerHTML = data.location.name;
    temperatureElement.innerHTML = data.current.temperature;
    temperatureElement.innerHTML = `${data.current.temperature}°C`;
  
    detailsElement.innerHTML = `${data.location.localtime}, ${data.current.weather_descriptions[0]} <br />
    Humidity: <strong>${data.current.humidity}%</strong>, Wind: <strong>${data.current.wind_speed} km/h</strong>`;
    iconElement.innerHTML = "🌤️";
   
    const iconUrl = data.current.weather_icons[0]; 
    iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector('#search-form-input');
    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = searchInput.value;

    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector('#search-form');

