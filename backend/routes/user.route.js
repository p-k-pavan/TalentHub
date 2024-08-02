import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/User.controller.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuth, updateProfile);

export default router;
