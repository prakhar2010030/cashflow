import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Dashboard from "./pages/dashboard/Dashboard";
import Send from "./pages/send/Send";
import Profile from "./pages/profile/Profile";
import QRScanner from "./pages/QrScanner/QrScanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qrScanner" element={<QRScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
