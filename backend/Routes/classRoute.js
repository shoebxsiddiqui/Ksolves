const express = require("express");
const {
  createClass,
  getClasses,
  getClass,
  getBooksByClassId,
} = require("../Controllers/classController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/create")
  .post(isAuthenticatedUser, authorizedRoles("instructor"), createClass);

router.route("/").get(getClasses);

router.route("/book").post(getBooksByClassId);

router.route("/:id").get(getClass);

module.exports = router;
