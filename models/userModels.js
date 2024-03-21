const mongoose = require("mongoose");
const userSchema = ({
  username: {
    type: String,
    required: [true, "please Enter user name"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
  },
  password: {
    type:String,
    required: [true, "please enter password"],
  },
});
//   {
//     timestamps: true,
//   }
module.exports = mongoose.model("user", userSchema);
