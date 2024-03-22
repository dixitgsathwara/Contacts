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
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("contact", contactSchema);
