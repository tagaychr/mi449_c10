
document.getElementById("cityForm").addEventListener("submit", function(event) {
    //event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the value of the input field
    var city = document.getElementById("cityInput").value;

    // Call your JavaScript function here, passing the city value
    generateWeather(city);
    generateMap(city);
});

function generateWeather(city) {
    alert("You entered: " + city);
}
function generateWeather(city){
    console.log(city);
}