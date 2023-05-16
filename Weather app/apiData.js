// //Data from the api
export const weatherHTML = (timeSlot) => {
  const { temp, feels_like, temp_max, temp_min } = timeSlot.main;
  return `
				<h3>${Math.round(temp - 273.15)}°C</h3>
	          <ul>
              <li>Cloud  
              ☁️${timeSlot.clouds.all} %</li>
              <li>Rain 
              🌧️ ${(timeSlot.pop * 25.4).toFixed(1)} mm</li>
              <li>Feels like ${Math.round(feels_like - 273.15)} °C</li>
              
              <li>Temp max 🔥 ${Math.round(temp_max - 273.15)} °C</li>
              <li>Temp min 
              ❄️
               ${Math.round(temp_min - 273.15)} °C</li>
	          </ul>
          `;
};
