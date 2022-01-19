const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  getUserDetails,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const isAuthenticatedUser = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router
  .route("/me")
  .get(isAuthenticatedUser, getUserDetails)
  .put(isAuthenticatedUser, updateUserDetails)
  .delete(isAuthenticatedUser, deleteUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);

module.exports = router;
