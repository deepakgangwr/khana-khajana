const mongoose=require('mongoose');
require('dotenv').config();
const url=process.env.URL;
async function fetchData() {
    try {
      await mongoose.connect(url);
      console.log("Connected");
  
      const fetched_data1 = mongoose.connection.db.collection("food_items");
      global.food_items = await fetched_data1.find({}).toArray();
      const fetched_data2 = mongoose.connection.db.collection("foodcategory");
      global.foodCategory = await fetched_data2.find({}).toArray();
      // console.log(foodCategory);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  module.exports=fetchData;