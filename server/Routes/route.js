import express from "express";
const Router = express.Router();
import {
  signupDetails,
  verifyOTP,
  loginDetails,
} from "../Controller/user_controller.js";

Router.post("/api/signup", signupDetails);
Router.post("/api/verifyOTP", verifyOTP);
Router.post("/api/login", loginDetails);

export default Router;
