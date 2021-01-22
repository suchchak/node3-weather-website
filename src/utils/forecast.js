const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d3f313a3245e73a390460e8fde895815&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services.");
    } else if (response.body.error) {
      callback("Unable to find location. Try with another search.");
    } else {
      //   callback(undefined, {
      //     weather_descriptions: response.body.current.weather_descriptions[0],
      //     actual: response.body.current.temperature,
      //     feelslike: response.body.current.feelslike,
      //   });
      callback(
        undefined,
        response.body.location.name +
          " " +
          response.body.location.country +
          " " +
          response.body.location.region,
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} out. It feels like ${response.body.current.feelslike}.`
      );
    }
  });
};

module.exports = forecast;
