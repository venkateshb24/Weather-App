const apiKey = "YOUR_API_KEY"; // Replace manually for local testing

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherDiv = document.getElementById("weatherInfo");

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>🌥 Weather: ${data.weather[0].main}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherDiv.classList.remove('show');
        setTimeout(() => {
            weatherDiv.classList.add('show');
        }, 10);

        weatherDiv.innerHTML = weatherHTML;
    } catch (error) {
        weatherDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
