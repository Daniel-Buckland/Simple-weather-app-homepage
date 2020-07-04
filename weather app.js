const temp = document.getElementById("temp");
const pageBackground = document.querySelector(".container");
const weatherImage = document.querySelector(".image");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

const kelvin = 273;
// my API key ahfshfa 
const myApiKey = "a50fbd270fefd99d47ad4a3d8d83cce8";

// check if the users device supports geolocation

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition, catchError);

}else{
    // add dom manipulation to show on html page
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// catch any errors

function catchError(error){
// add somekind of error message 
}

// get weather data from the open weather api

function getWeather(latitude, longitude){
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}`;
    
    // If you want to see the mondified url in the console
    // console.log(url)

     fetch(url)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            if (data.weather[0].main === "Cloudy"){
                changePictureCloud();
            }
            else if (data.weather[0].main ==="Rain"){
                changePictureCloud();
            }
            else if (data.weather[0].main === "partly cloudy"){
                changePicturePartlyCloudy()
            }else{
                changePictureSun();
            }
                
            })

        .then(function(){
            changePage();
        })
        .catch(error => {
            console.log(error);
        }
        )
        
}

function changePage(){
   temp.innerHTML = `${weather.temperature.value}<span>&#8451</span>`;
}

function changePictureCloud(){
    weatherImage.src = "Images/cloud.png";
    pageBackground.style.background = "linear-gradient(to top, #292929, #414141, #5c5b5b, #777777, #949393)";
}
function changePicturePartlyCloudy(){
    weatherImage.src ="Images/Partly-cloudy.png";
    pageBackground.style.background = "linear-gradient(to top, #5ab9d3, #89a9ce, #a49cb7, #a5959e, #949393)";
}

function changePictureSun(){
    weatherImage.src ="Images/sun.png";
}