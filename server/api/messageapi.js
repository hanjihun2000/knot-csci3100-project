/*
 * This section of the code imports necessary modules for the application.
 */
var express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });
var router = express.Router();
var app = express();
app.use(express.json());
app.use(cors());

var Message = require("../models/message");

// Send a message
router.post("/sendMessage", upload.none(), async (req, res) => {
  const { sender, receiver, messageText } = req.body;
  // Basic validation to check if all required fields are provided
  if (!sender) {
    return res
      .status(400)
      .json({ status: "error", message: "Sender is required!" });
  }
  if (!receiver) {
    return res
      .status(400)
      .json({ status: "error", message: "Receiver is required!" });
  }
  if (!messageText) {
    return res
      .status(400)
      .json({ status: "error", message: "Message text is required!" });
  }
  // Create a new message
  const message = new Message({
    sender: sender,
    receiver: receiver,
    messageText: messageText,
    // timeOfMessage will be set automatically by the default in the schema
  });
  // Save the message to the database
  message
    .save()
    .then((savedMessage) => {
      res.status(201).json({
        status: "success",
        message: "Message sent successfully!",
        data: savedMessage,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: "error", message: "Failed to send message." });
    });
});

module.exports = router;
