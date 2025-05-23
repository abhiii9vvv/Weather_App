const apiKey = "b1983f360a14431bb6060233252005";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherCard = document.getElementById("weatherCard");

  if (!city) {
    weatherCard.style.display = "block";
    weatherCard.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await res.json();

    if (data.error) throw new Error(data.error.message);

    const { location, current } = data;

    weatherCard.innerHTML = `
      <h2>${location.name}, ${location.country}</h2>
      <p>${current.condition.text}</p>
      <img src="https:${current.condition.icon}" alt="Weather Icon" />
      <p>🌡️ Temperature: ${current.temp_c} °C</p>
      <p>💧 Humidity: ${current.humidity}%</p>
      <p>🌬️ Wind: ${current.wind_kph} kph</p>
    `;
    weatherCard.style.display = "block";
  } catch (err) {
    weatherCard.innerHTML = `<p>Error: ${err.message}</p>`;
    weatherCard.style.display = "block";
  }
}
