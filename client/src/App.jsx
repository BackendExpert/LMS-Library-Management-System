import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./comportments/HomePage/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}