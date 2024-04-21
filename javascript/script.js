
document.getElementById("cityForm").addEventListener("submit", function(event) {
    //event.preventDefault(); 

    var city = document.getElementById("cityInput").value;

    generateWeather(city);
    generateMap(city);
});

function generateWeather(city) {
    alert("You entered: " + city);
}
function generateMap(city){
    console.log(city);
}