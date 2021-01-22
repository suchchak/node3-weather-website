const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3VjaGNoYWsiLCJhIjoiY2tqaWttNWc1MWNiMzJ2bnZzMWg4ODc0dCJ9.oktlCoBHmja904D8GcQmgg&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services.");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try with another search.");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
