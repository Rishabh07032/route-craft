import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import { Toaster } from "react-hot-toast";
import MyTrips from "./pages/MyTrips";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Login from "./pages/Login";
import DestinationsPage from "./pages/DestinationsPage";

function App() {
  return (
    
    <BrowserRouter>
    <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "#111827",
      color: "#fff",
      border: "1px solid #06b6d4",
      padding: "16px",
      borderRadius: "12px",
    },
  }}
/>

      <Navbar />

      <Routes>
        <Route
  path="/my-trips"
  element={
    <ProtectedRoute>
      <MyTrips />
    </ProtectedRoute>
  }
/>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
  path="/planner"
  element={
    <ProtectedRoute>
      <Planner />
    </ProtectedRoute>
  }
/>

        <Route
          path="/login"
          element={<Login />}
        />

       <Route
  path="/destinations"
  element={
    <ProtectedRoute>
      <DestinationsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/privacy"
  element={<Privacy />}
/>

<Route
  path="/terms"
  element={<Terms />}
/>

<Route
  path="/faq"
  element={<FAQ />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;