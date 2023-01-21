const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Message = require("./GroupMessage.module");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const mongodb_atlas_uri = process.env.MONGODB_ATLAS_URI;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db_connection = mongoose.connection;

db_connection.on("error", (error) => {
  console.log("MongoDB Failed:", error);
});

db_connection.once("open", () => {
  console.log("Server connected to MongoDB");
});

app.get("/messages", async (req, res) => {
  const page = req.query.p || 0;

  const messagesPerPage = 15;
  let messages = [];
  const groupMessages = await Message.find();
  try {
    res.send(groupMessages);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/sendmessage", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message,
  });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`working ${port}`));
