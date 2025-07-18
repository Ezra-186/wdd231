import { OWM_KEY, LAT, LON } from './config.mjs';
import { displayForecast } from './displayForecast.mjs';

const BASE = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchForecast() {
    try {
        const url = `${BASE}?lat=${LAT}&lon=${LON}&units=imperial&appid=${OWM_KEY}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        displayForecast(data);
    } catch (err) {
        console.error('forecast error:', err);
    }
}
