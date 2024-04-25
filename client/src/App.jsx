import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./comportments/HomePage/HomePage";
import SignIn from "./comportments/SignInSignUp/SignIn";
import SignUp from "./comportments/SignInSignUp/SignUp";
import PrivateRoute from "./comportments/Security/PrivateRoute";
import Dashboard from "./comportments/Dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}