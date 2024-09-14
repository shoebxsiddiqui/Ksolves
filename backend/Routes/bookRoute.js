const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  getChapterByBookId,
} = require("../Controllers/bookController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, authorizedRoles("instructor"), createBook);

router.route("/").get(getBooks);

router.route("/chapter").post(getChapterByBookId);

router.route("/:id").get(getBook);

module.exports = router;
