const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const regex = /^[a-zA-Z0-9_-]{3,16}$/;
        return regex.test(value);
      },
      message: "Invalid website name",
    },
  },
  url: {
    type: String,
    validate: {
      validator: function (value) {
        const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/;
        return regex.test(value);
      },
      message: "Invalid url",
    },
  },
  username: {
    type: String,
    validate: {
      validator: function (value) {
        const regex = /^[a-zA-Z0-9_-]{3,16}$/;
        return regex.test(value);
      },
      message: "Invalid username",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        const regex = /^\d{8}$/;
        return regex.test(value);
      },
      message: "Invalid phone",
    },
  },
  notes: {
    type: String,
    validate: {
      validator: function (value) {
        const regex = /^(?!\s*$).+/;
        return regex.test(value);
      },
      message: "Invalid notes",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Logins || mongoose.model("Logins", loginsSchema);
