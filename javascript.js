var apikey = "fa6bd2cab708de26abaa0521a88c8ab9"
var loadingHTML = ""

$("document").ready(function(){
    loadingHTML = document.body.innerHTML
    fetchWeather("Temuco","CL")
})

$(document).on("submit","form",function(){
    fetchWeather($("#city").val(),$("#country").val())
    return false
})

function fetchWeather(city,country){
    document.body.innerHTML=loadingHTML
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?units=metric&lang=sp&q="+city+","+country+"&APPID="+apikey
    var request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText)
            var src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49790.58027862489!2d"+response.coord.lon+"!3d"+response.coord.lat+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2scl!4v1581343174911!5m2!1sen!2scl" 
            $("#city").val(city)
            $("#country").val(country)
            $("#map").attr("src",src)
            $("#weather h2").text("El tiempo en " + city)
            $("#weather img").attr("src","http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
            $("#weather h3")[0].innerText = response.weather[0].main
            $("#weather p")[0].innerText = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1)
            $("#temp p")[0].innerText = response.main.temp+"°C"
            $("#temp p")[1].innerText = response.main.temp_min+"°C"
            $("#temp p")[2].innerText = response.main.temp_max+"°C"
            $("#weather p")[4].innerText = "Viento: " + response.wind.speed + " m/s"
        }else if(this.readyState == 4 && this.status == 404){
            alert("Error encontrando ubicacion")
        }
    }
    request.send()
}