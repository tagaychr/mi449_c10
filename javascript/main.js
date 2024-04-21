document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("cityForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        var city = document.getElementById("cityInput").value;

        generateWeather(city);
        //generateMap(city);
    });
});

function latLonToTileZXY(lat, lon, zoomLevel) {
    const MIN_ZOOM_LEVEL = 0
    const MAX_ZOOM_LEVEL = 22
    const MIN_LAT = -85.051128779807
    const MAX_LAT = 85.051128779806
    const MIN_LON = -180.0
    const MAX_LON = 180.0
  
    if (
      zoomLevel == undefined ||
      isNaN(zoomLevel) ||
      zoomLevel < MIN_ZOOM_LEVEL ||
      zoomLevel > MAX_ZOOM_LEVEL
    ) {
      throw new Error(
        "Zoom level value is out of range [" +
          MIN_ZOOM_LEVEL.toString() +
          ", " +
          MAX_ZOOM_LEVEL.toString() +
          "]"
      )
    }
  
    if (lat == undefined || isNaN(lat) || lat < MIN_LAT || lat > MAX_LAT) {
      throw new Error(
        "Latitude value is out of range [" +
          MIN_LAT.toString() +
          ", " +
          MAX_LAT.toString() +
          "]"
      )
    }
  
    if (lon == undefined || isNaN(lon) || lon < MIN_LON || lon > MAX_LON) {
      throw new Error(
        "Longitude value is out of range [" +
          MIN_LON.toString() +
          ", " +
          MAX_LON.toString() +
          "]"
      )
    }
  
    let z = Math.trunc(zoomLevel)
    let xyTilesCount = Math.pow(2, z)
    let x = Math.trunc(Math.floor(((lon + 180.0) / 360.0) * xyTilesCount))
    let y = Math.trunc(
      Math.floor(
        ((1.0 -
          Math.log(
            Math.tan((lat * Math.PI) / 180.0) +
              1.0 / Math.cos((lat * Math.PI) / 180.0)
          ) /
            Math.PI) /
          2.0) *
          xyTilesCount
      )
    )
  
    return z.toString() + "/" + x.toString() + "/" + y.toString()
  }

function generateWeather(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=4ce8c6132c41460caf945817242104&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => {

            const { location, current } = data;
            const { name, region, country, lat, lon } = location; // Extracting lat and lon here
            const { temp_c, condition } = current;

            const weatherHTML = `
                <h2>Current Weather in ${name}, ${region}, ${country}</h2>
                <p>Temperature: ${temp_c}°C</p>
                <p>Condition: ${condition.text}</p>
            `;

            document.getElementById('weather').innerHTML = weatherHTML;

            const xyz = latLonToTileZXY(lat, lon, 15);

            const apiUrl = `https://api.tomtom.com/map/1/tile/basic/night/${xyz}.png?key=jVzPLfJYABiemFUjBRts5PqLY9VKWMr4`;

            const img = document.getElementById('map').querySelector('img');

            if (img) {
                img.src = apiUrl;
            } else {
                const newImg = document.createElement('img');
                newImg.src = apiUrl;
                document.getElementById('map').appendChild(newImg);
            }


        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = `<p>Error fetching weather data for ${city}.</p>`;
        });
}

function generateMap(city){
    console.log(city);
    //https://api.tomtom.com/map/1/tile/basic/main/10/130/450/.png?key=jVzPLfJYABiemFUjBRts5PqLY9VKWMr4
    //https://api.tomtom.com/map/1/tile/basic/main/10/512/512.png?key=jVzPLfJYABiemFUjBRts5PqLY9VKWMr4
    
    const apiUrl = `https://api.tomtom.com/map/1/tile/basic/night/5/16/25.png?key=jVzPLfJYABiemFUjBRts5PqLY9VKWMr4`;

    const img = document.createElement('img');

    img.src = apiUrl;

    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.appendChild(img);
    } else {
        console.error("Map div not found.");
    }
}
