const express = require("express");
const router = express.Router();
const {
  getLists,
  add,
  getAbout,
  getListItems,
  del,
} = require("../controllers/items");

router.route("/").get(getLists).post(add);
router.route("/about").get(getAbout);
router.route("/:customListName").get(getListItems);
router.route("/delete").post(del);

module.exports = router;
