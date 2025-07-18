export function displayForecast(data) {
    if (!data || !data.list) return;

    const list = data.list; 
    const out = document.getElementById('forecast-list');
    if (!out) return;
    out.innerHTML = ''; 

    const weekday = (dtTxt) =>
        new Date(dtTxt).toLocaleDateString('en-US', { weekday: 'short' });

    const middaySlices = list.filter(item => item.dt_txt.includes('12:00:00'))
        .slice(1, 4); 

    middaySlices.forEach(item => {
        const li = document.createElement('li');
        const day = weekday(item.dt_txt);
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

        li.innerHTML = `
        <span class="day">${day}</span>
        <img src="${iconURL}" alt="${item.weather[0].description}">
        <span class="temp">${temp}°F</span>
      `;
        out.append(li);
    });
}
  