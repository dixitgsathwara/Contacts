const mongoose = require("mongoose");
const contactSchema = ({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  name: {
    type: String,
    required: [true, "please add contact name"],
  },
  phone: {
    type: Number,
    required: [true, "please add number"],
  },
});
//   {
//     timestamps: true,
//   }
module.exports = mongoose.model("contact", contactSchema);
