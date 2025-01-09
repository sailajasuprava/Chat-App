import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuth } from "./context/authContext";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <div className="p-4 h-screen flex items-center justify-center bg-slate-900">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
