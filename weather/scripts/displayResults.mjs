


export function displayResults(data) {
    const nameEl = document.querySelector('#town-name');
    const iconEl = document.querySelector('#weather-icon');
    const descEl = document.querySelector('#description');
    const tempEl = document.querySelector('#temperature');

    nameEl.textContent = data.name;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const description = data.weather[0].description;

    iconEl.setAttribute('src', iconUrl);
    iconEl.setAttribute('alt', description);
    descEl.textContent = description;
    tempEl.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
}
  