const express = require("express");
const DeviceDetector = require("device-detector-js");

const app = express();
const detector = new DeviceDetector();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API detector PideeQR funcionando");
});


/* -----------------------------------
 DETECCION POR NAVEGADOR
----------------------------------- */

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


/* -----------------------------------
 DETECCION DESDE APPHIVE
----------------------------------- */

app.get("/deviceinfo", (req, res) => {

  const brand = req.query.brand || "desconocido";
  const deviceId = req.query.deviceId || "desconocido";
  const uniqueId = req.query.uniqueId || "desconocido";

  let android_aproximado = "desconocido";

  // reglas básicas
  if (deviceId.includes("bengal")) {
    android_aproximado = "Android 11 - 13";
  }

  if (brand.toLowerCase().includes("samsung")) {
    android_aproximado = "Android 12 - 15";
  }

  if (brand.toLowerCase().includes("xiaomi")) {
    android_aproximado = "Android 11 - 14";
  }

  res.json({
    brand,
    deviceId,
    uniqueId,
    android_aproximado
  });

});


/* ----------------------------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
