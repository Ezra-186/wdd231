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
    setFooterDates();

    
    if (location.pathname.endsWith('thankyou.html')) {
        const { initThankYouPage } = await import('./thankyou.mjs');
        initThankYouPage();
        return;
    }

    if (location.pathname.endsWith('join.html')) {
        const { initJoinPage } = await import('./join.mjs');
        initJoinPage();
    }

    
    initViewToggle();
    loadMembers();
    loadSpotlights();

    const [current, forecast] = await Promise.all([
        fetchWeather(),
        fetchForecast()
    ]);
    displayWeather(current);
    displayForecast(forecast);
});
