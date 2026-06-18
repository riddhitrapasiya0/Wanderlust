import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ListingsIndex from "./pages/ListingsIndex";
import ListingShow from "./pages/ListingShow";
import ListingCreate from "./pages/ListingCreate";
import ListingEdit from "./pages/ListingEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/listings" replace />} />
        <Route path="/listings" element={<ListingsIndex />} />
        <Route path="/listings/:id" element={<ListingShow />} />
        <Route path="/listings/new" element={<ListingCreate />} />
        <Route path="/listings/:id/edit" element={<ListingEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;