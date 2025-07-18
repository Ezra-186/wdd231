


import { API_KEY, LAT, LON, UNITS, BASE_URL } from './config.mjs';

export async function fetchWeather() {
    const url = `${BASE_URL}?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
