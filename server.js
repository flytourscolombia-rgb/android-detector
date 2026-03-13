const express = require("express");
const DeviceDetector = require("device-detector-js");

const app = express();
const detector = new DeviceDetector();

app.get("/", (req, res) => {
  res.send("API detector funcionando");
});

app.get("/detect", (req, res) => {

  const userAgent = req.headers["user-agent"];
  const device = detector.parse(userAgent);

  res.json({
    brand: device.device?.brand || "desconocido",
    model: device.device?.model || "desconocido",
    type: device.device?.type || "desconocido",
    os: device.os?.name || "desconocido",
    android_version: device.os?.version || "desconocido",
    browser: device.client?.name || "desconocido"
  });

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
