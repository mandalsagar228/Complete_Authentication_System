import axios from "axios";

const URL = "https://complete-authentication-system.onrender.com";

// Sending signup data to the server.
export const sendingSignupData = async (signupData) => {
  try {
    return await axios.post(`${URL}/api/signup`, signupData);
  } catch (error) {
    console.log("Error from api ", error);
    return error.response;
  }
};

// Sending Login Data
export const sendingLoginData = async (loginData) => {
  try {
    return await axios.post(`${URL}/api/login`, loginData);
  } catch (error) {
    console.log("Error from login api", error);
    return error.response;
  }
};

// Sending OTP from the client side for verification:

export const VerifyOTPInServer = async (OTPValue) => {
  try {
    return await axios.post(`${URL}/api/verifyOTP`, OTPValue);
  } catch (error) {
    console.log("error from verify otp ", error);
    return error.response;
  }
};

// Sending the Reset passwod to the server or updating the password:

export const SendResetPassword = async (resetPasswordValue) => {
  try {
    return await axios.post(`${URL}/api/resetpassword`, resetPasswordValue);
  } catch (error) {
    console.log("error from the reset api", error);
    return error.response;
  }
};
