const express = require("express");
const {
  createChapter,
  getChapters,
  getChapter,
} = require("../Controllers/chapterController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, authorizedRoles("instructor"), createChapter);

router.route("/").get(getChapters);

router.route("/:id").get(getChapter);

module.exports = router;
