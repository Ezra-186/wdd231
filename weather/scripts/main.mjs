import { fetchWeather } from './fetchWeather.mjs';
import { displayResults } from './displayResults.mjs';

window.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchWeather();
    if (data) displayResults(data);
    setFooterDates();
});

function setFooterDates() {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified-time').textContent = document.lastModified;
}
