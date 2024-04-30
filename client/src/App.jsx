import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./comportments/HomePage/HomePage";
import SignIn from "./comportments/SignInSignUp/SignIn";
import SignUp from "./comportments/SignInSignUp/SignUp";
import PrivateRoute from "./comportments/Security/PrivateRoute";
import Dashboard from "./comportments/Dashboard/Dashboard";
import  secureLocalStorage  from  "react-secure-storage";
import ForgetPass from "./comportments/SignInSignUp/ForgetPass";
import CheckOTP from "./comportments/SignInSignUp/CheckOTP";

export default function App() {
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgetPass" element={<ForgetPass />} />
        <Route path="/CheckOTP" element={<CheckOTP />} />
        {/* after login redreact to homepage with login token */}
            {
          (() => {
            if(RoleUser !== null && EmailUser !== null){
              return (
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}/>
              )
            } 
            else{
              return (
                <Route path="/" element={<HomePage />}/>
              )
            }
          })()
        }
        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
      </Routes>
    </BrowserRouter>
  )
}