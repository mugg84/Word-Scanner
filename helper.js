const createVenueHTML = (name, location) => {
        return `<h2>${name}</h2> 
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const addPic = pic => {
        return `<div class="picArea">
                <img class="venueimage" src="${pic}"/>
                </div>`
}

const addTip = (name, tip) => {
        return `<div class="tip">
        <h4>${name} says:</h4>
        <p>${tip}</p>
        </div>`
}

const createWeatherHTML = (currentDay) => {

        return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
                <h2>Condition: ${currentDay.weather[0].description}</h2>
                <h2>Pressure: ${currentDay.main.humidity}%</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);
const kelvinToCelsius = k => (k - 273).toFixed(0);