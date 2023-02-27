const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email format asd",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
