import bcrypt from "bcrypt";
import user from "../Models/user.model.js";
import { sendOTP, generateOTP } from "../utils/OTPVerification.js";

export const signupDetails = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const hashCpassword = await bcrypt.hash(confirmPassword, 10);

    const afterHashingSignupData = {
      firstname,
      lastname,
      email,
      password: hashCpassword,
      confirmPassword: hashPassword,
    };

    console.log("THis is full data ", afterHashingSignupData);
    const userAlreadyExist = await user.findOne({ email: email });
    if (userAlreadyExist) {
      return res.status(401).json({ msg: "Account already exist" });
    }
    // Generating OTP:
    const OTPData = generateOTP();
    const { OTP, expireAt } = OTPData;
    afterHashingSignupData.otp = OTP;
    afterHashingSignupData.otpExpirationTime = expireAt;
    afterHashingSignupData.isVerified = false;

    const signupData = await new user(afterHashingSignupData);
    await signupData.save();
    sendOTP(email, OTP);

    return res.status(201).json({ msg: "signup successful", signupData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
};

// Verify OTP comming from the client side:
export const verifyOTP = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("This is otp value", text);
    // Find the user with the provided OTP
    const userWithOTP = await user.findOne({ otp: text });
    if (!userWithOTP) {
      return res.status(401).json({ msg: "Invalid OTP" });
    }

    // Verify if the OTP is not expired
    if (userWithOTP.otpExpirationTime < Date.now()) {
      return res.status(401).json({ msg: "OTP has expired" });
    }

    // Update the user as verified and remove OTP and expiration time
    userWithOTP.isVerified = true;
    userWithOTP.removeOTP();
    await userWithOTP.save();
    return res.status(200).json({ msg: "Verified succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// Getting login details:
export const loginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isLoginVerified = await user.findOne({
      email: email,
      // password: password,
    });
    if (!isLoginVerified) {
      return res.status(401).json({ msg: "invalid email" });
    }

    let match = await bcrypt.compare(password, isLoginVerified.password);

    if (match) {
      console.log(match);
      return res.status(200).json({ msg: "Login Successful" });
    } else {
      res.status(401).json({ msg: "password doesn't matched" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};
