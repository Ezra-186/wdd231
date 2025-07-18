export function displayWeather(data) {
  if (!data || !data.main) return;

  const fmtTime = secs =>
    new Date(secs * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

  const box = document.getElementById('weather-data');
  if (!box) return;

  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  box.innerHTML = `
    <p>Now: ${temp}°F, ${desc}</p>
    <figure>
      <img src="${iconURL}" alt="${desc}" width="80" height="80" loading="lazy">
      <figcaption>${desc}</figcaption>
    </figure>
  `;

  document.getElementById('high-temp').textContent = Math.round(data.main.temp_max);
  document.getElementById('low-temp').textContent = Math.round(data.main.temp_min);
  document.getElementById('humidity').textContent =`${data.main.humidity}%`;
  document.getElementById('sunrise').textContent = fmtTime(data.sys.sunrise);
  document.getElementById('sunset').textContent = fmtTime(data.sys.sunset);
}
