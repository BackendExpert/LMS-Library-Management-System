import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./comportments/HomePage/HomePage";
import SignIn from "./comportments/SignInSignUp/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}