const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://Sidharth_S:sidharthuthradom@cluster0.bqkifzg.mongodb.net/traveldb?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });