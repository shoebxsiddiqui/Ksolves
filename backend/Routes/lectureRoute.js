const express = require("express");
const {
  createLecture,
  getLectures,
  getLecture,
} = require("../Controllers/lectureController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, authorizedRoles("instructor"), createLecture);

router.route("/").get(getLectures);

router.route("/:id").get(getLecture);

module.exports = router;
