//CODE FROM HOMEWORK USEFUL FOR THE PROJECT
//1 Use axios to get weather data from the API I showed at the start of the lesson
//2 Wrap the axios call in an async function
//3 Use await before the axios call
//4 Destructure the response to get the { data } part of the response
//5 Console.log the weather data (this will show you completed the above)
// const apiURL =
//   "https://api.openweathermap.org/data/2.5/forecast?lat=52&lon=-2&appid=484ed539b40f7afe4d5672ecbff1895b";
// const getData1 = async () => {
//   const { data } = await axios.get(apiURL);
//   console.log(data.list);
//   data.list.forEach((item) => {
//     console.log(new Date(item.dt * 1000).toLocaleString());
//     console.log(Math.round(item.main.temp - 273.15));
//     console.log(item.weather[0].description);
//   });
// };
// getData1();
// Importing the data from other js
import { getAPI_URL } from "./weapi.js";
import { weatherHTML } from "./apiData.js";

//Variables for the HTML elements
const place = document.getElementById("place");
const button = document.getElementById("button");
const title = document.getElementById("title");
const weatherContainer = document.getElementById("weatherContainer");
let weatherData;
//EVENT LISTENER HTML
//Run getData function on button click and enter
button.addEventListener("click", () => {
  const value = document.getElementById("place").value;
  getData(value);
});

place.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getData();
  }
});

// Error in case the user has  location switched off
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error);
};
const error = (reason) => {
  title.innerHTML = `<h3>${reason.message}. Please enable Geolocation and reload the page.</h3>`;
};
const success = (position) => {};
getLocation();
// const getData = async (city) => {
//   try {
//     const returnData = await weatherHTML(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=24581586ed3d69ed3183980de6c64e19`
//     );
//     // console.log(returnData);
//     const htmlString = returnData
//       .map((item) => `<div>${item.visibility}</div>`)
//       .join("");
//     console.log(htmlString);
//     document.getElementById("weatherContainer").innerHTML = htmlString;
//   } catch {}
// };

//Retrieve data from API URL and save into a variable or informs the user what and why there is a problem.
const getData = async () => {
  try {
    const inputRegex = /[A-Za-z ]{2}/gi;
    if (inputRegex.test(place.value)) {
      const result = await axios.get(getAPI_URL(place.value));
      weatherData = result.data.list;
      onWeatherData(weatherData);
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      title.innerHTML = `<h3>Error code: ${error.response.status}. Error status: ${error.response.statusText}. Please reload the page and enter a valid Location</h3>`;
      weatherContainer.innerHTML = "";
    } else {
      title.innerHTML = "<h3>API is not working, something went wrong</h3>";
    }
  }
};

//For loop to determine number of times we access the API data. It is also used loop over timeArr in order to make dynamic times and then insert the HTML into the DOM
const onWeatherData = (weatherData) => {
  const timeArr = ["Now", "3 Hours later", "6 Hours later"];
  let holder = "";
  for (let i = 0; i < timeArr.length; i++) {
    timeArr[i];
    holder += `<div id="holder${i}" class="holder">
						<h2>${timeArr[i]}</h2>
						${weatherHTML(weatherData[i])}
					</div>`;
    //console.log to check all data I can use
    console.log(weatherData);
  }
  weatherContainer.innerHTML = holder;
};
