const multer = require("multer");
const express = require("express");
const router = express.Router();

//cb: callback: función que se va a ejecutar después
//de que se ejecute algo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    //shif coge el primer valor del array y pop el ultimo
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
