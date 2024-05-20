const mongoose = require("mongoose");

require("dotenv").config();

const DB_URL = process.env.DB_URL;
const LOCAL_DB_URL = process.env.LOCAL_DB_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.set("strictQuery", false);
mongoose.connection.once("open", () => {
  console.log(`${DB_NAME} connection ready!`);
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(`${LOCAL_DB_URL}/tku`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    authSource: "admin",
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
