const express = require("express");
require("dotenv").config();
const qs = require("qs");
const axios = require("axios");
const { z } = require("zod");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/dist")));

const mapBoxUrl = "https://api.mapbox.com/search/geocode/v6/forward";
const mapboxAPIKey = process.env.MAPBOX_API_KEY;

const weatherMapUrl = "https://api.openweathermap.org/data/3.0/onecall";
const weatherMapAPIKey = process.env.WEATHERMAP_API_KEY;

app.get("/api/search", async (req, res) => {
  try {
    let query = req.query;
    query.access_token = mapboxAPIKey;
    let queryString = qs.stringify(query);

    const mapboxResponse = await axios.get(`${mapBoxUrl}?${queryString}`);
    res.send(mapboxResponse.data);
  } catch (error) {
    console.error("Error fetching data from Mapbox API:", error.message);
    res.status(500).send({ error: "Failed to fetch search results" });
  }
});

app.get("/api/weather", async (req, res) => {
  try {
    const qObj = JSON.parse(req.query.q);

    const zparams = z
      .object({
        lon: z.coerce.number(),
        lat: z.coerce.number(),
      })
      .parse(qObj);

    const qparams = new URLSearchParams({
      ...zparams,
      appid: weatherMapAPIKey,
      units: "imperial",
    });

    const rUrl = `${weatherMapUrl}?${qparams.toString()}`;

    const weatherResponse = await axios.get(rUrl);

    res.send(weatherResponse.data);
  } catch (error) {
    console.error("Error in /api/weather route:", error.message);
    res.status(500).send({ error: "Failed to fetch weather data" });
  }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
