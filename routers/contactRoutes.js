const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getSpeContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getAllContacts).post(addContact);
router.route("/:id").get(getSpeContact).put(updateContact).delete(deleteContact);
//router.route("/").post(addContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);
module.exports = router;
