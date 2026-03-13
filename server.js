const express = require("express");
const app = express();

app.use(express.json());

const devices = {
  "SM-S918B": {
    model: "Samsung Galaxy S23 Ultra",
    android: "14"
  },
  "Pixel 8": {
    model: "Google Pixel 8",
    android: "14"
  },
  "SM-A515F": {
    model: "Samsung Galaxy A51",
    android: "13"
  }
};

app.get("/", (req, res) => {
  res.send("API PideeQR funcionando");
});

app.get("/device", (req, res) => {

  const brand = req.query.brand;
  const device = req.query.deviceId;

  if(devices[device]){
    res.json({
      brand: brand,
      device: device,
      model: devices[device].model,
      android_estimado: devices[device].android
    });
  } else {
    res.json({
      brand: brand,
      device: device,
      model: "desconocido",
      android_estimado: "desconocido"
    });
  }

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});
