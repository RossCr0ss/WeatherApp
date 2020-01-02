window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/f3fee5b7c9c4d82eb9d9a6694ca0a235/${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //math formula to Celsius
                        let celsius = ((temperature - 32)*(5/9)).toFixed(1)
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"))

                    //Convert to Celsius
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent == "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius;
                        }
                        else {
                            temperatureSpan.textContent ="F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
                

                
        })
        
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);     
    }

})