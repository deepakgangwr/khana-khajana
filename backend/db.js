const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.URL;

async function fetchData() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to mongoDB");

    mongoose.connection.once('open', async () => {
      try {
        const fetched_data1 = mongoose.connection.db.collection("food_items");
        global.food_items = await fetched_data1.find({}).toArray()
          const fetched_data2 = mongoose.connection.db.collection("foodcategory");
          global.foodcategory = await fetched_data2.find({}).toArray();
        // console.log(global.foodCategory )
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = fetchData;
