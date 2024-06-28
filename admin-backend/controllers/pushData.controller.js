const fs = require("fs/promises");
const Data = require("../models/data.model.js");

function PushData(req, res, next) {
  // reading data.json file
  async function readData() {
    try {
      const data = await fs.readFile("./data.json", "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  //   storing data.json into mongodb
  (async () => {
    try {
      const data = await readData();
      const dataToPush = [];
      for (const item of data) {
        const newItem = new Data(item);
        dataToPush.push(newItem);
      }
      await Data.insertMany(dataToPush);
      console.log("Data Pushed to mongodb!");
    } catch (err) {
      console.log(err.message);
    }
  })();
  //   sending response
  res.status(200).json({ message: "Data pushed successfully" });
}

module.exports = { PushData };
