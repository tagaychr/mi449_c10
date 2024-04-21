
document.getElementById("cityForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var city = document.getElementById("cityInput").value;

    generateWeather(city);
    generateMap(city);
});

function generateWeather(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=4ce8c6132c41460caf945817242104&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => {

            const { location, current } = data;
            const { name, region, country } = location;
            const { temp_c, condition } = current;

            const weatherHTML = `
                <h2>Current Weather in ${name}, ${region}, ${country}</h2>
                <p>Temperature: ${temp_c}°C</p>
                <p>Condition: ${condition.text}</p>
            `;

            document.getElementById('weather').innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = `<p>Error fetching weather data for ${city}.</p>`;
        });
}
function generateMap(city){
    console.log(city);
}