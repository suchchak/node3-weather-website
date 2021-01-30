const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(__filename);
// console.log(path.join(__dirname, "../public"));
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars  engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  //   res.send("Hello express!");
  res.render("index", { title: "Weather", name: "Suchi" });
});

app.get("/about", (req, res) => {
  //   res.send("Hello express!");
  res.render("about", { title: "About Me", name: "Suchi" });
});

app.get("/help", (req, res) => {
  //   res.send("Hello express!");
  res.render("help", {
    title: "Help",
    name: "Suchi",
    helpText: "Help Tip",
  });
});

app.get("/weather", (req, res) => {
  //res.send("Weather Page");
  if (!req.query.address) {
    return res.send({ error: "You must provide an address." });
  }

  geoCode(req.query.address, (error, data = {}) => {
    if (error) {
      return res.send(error);
    }

    forecast(data.latitude, data.longitude, (error, location, forecastData) => {
      if (error) {
        return res.send(error);
      }
      console.log(data.location);
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term." });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  //res.send("Help article not found");
  res.render("error404", {
    title: "Error",
    name: "Suchi",
    errorText: "Help article not found",
  });
});

app.get("*", (req, res) => {
  //res.send("my 404 page");
  res.render("error404", {
    title: "Error",
    name: "Suchi",
    errorText: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port : " + port);
});
