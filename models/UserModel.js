const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
      },
      message: "Э-мэйл хаяг буруу байна!",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$/g.test(
          value
        );
      },
      message: "1 том үсэг, 1 жижиг үсэг, 1 тоо, 1 тэмдэгт, 8-20 урттай байна",
    },
    minlength: 8,
  },
});

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
