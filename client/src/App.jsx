import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Header,
  SignupPage,
  HomePage,
  WelcomePage,
  Login,
  ForgotPassword,
  VerifyOTP,
  Reset,
} from "./Components";

function App() {
  return (
    <Router>
      <>
        <Header />

        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
