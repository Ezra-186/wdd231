import { initNavToggle } from './navToggle.mjs';
import { initViewToggle } from './gridListToggle.mjs';
import { loadMembers } from './members.mjs';
import { setFooterDates } from './footer.mjs';
import { fetchWeather } from './fetchWeather.mjs';
import { displayWeather } from './displayWeather.mjs';
import { fetchForecast } from './fetchForecast.mjs';
import { displayForecast } from './displayForecast.mjs';
import { loadSpotlights } from './spotlights.mjs';

window.addEventListener('DOMContentLoaded', async () => {
    initNavToggle();
    initViewToggle();
    loadMembers();         
    loadSpotlights();   
    setFooterDates(); 

    // Weather 3-day
    const [currentData, forecastData] = await Promise.all([
        fetchWeather(),
        fetchForecast()
    ]);
    displayWeather(currentData);
    displayForecast(forecastData);
});