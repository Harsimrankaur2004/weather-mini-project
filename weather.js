const apiKey = "7caabc9abb52cb2d94f3517edd26892e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBar = document.querySelector('.js-search-bar')
const searchBtn = document.querySelector('.js-search-button')

searchBtn.addEventListener('click', () => {
  checkWeather(searchBar.value);
});

searchBar.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    checkWeather(searchBar.value);
  }
});


async function checkWeather(city) {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);

  if (response.status === 404) {
    document.querySelector('.js-error')
      .innerHTML = `<p>Invalid City.</p>`;
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  let data = await response.json();

  document.querySelector('.js-error')
    .innerHTML = '';
    document.querySelector('.weather').style.display = 'block'; 

  document.querySelector('.js-temp')
    .innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.js-city')
    .innerHTML = data.name;
  document.querySelector('.js-humidity-per')
    .innerHTML = `${data.main.humidity}%`;
  document.querySelector('.js-wind-speed')
    .innerHTML = `${data.wind.speed} km/h`;


  let weatherStatus = data.weather[0].main;
  document.querySelector('.js-weather-icon')
    .src = `images/${weatherStatus.toLowerCase()}.png`;
  document.querySelector('.js-weather-status')
    .innerHTML = weatherStatus;
}

checkWeather('New York');

