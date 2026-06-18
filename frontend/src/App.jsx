import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ListingsIndex from "./pages/ListingsIndex";
import ListingShow from "./pages/ListingShow";
import ListingCreate from "./pages/ListingCreate";
import ListingEdit from "./pages/ListingEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/listings" replace />} />
            <Route path="/listings" element={<ListingsIndex />} />
            <Route path="/listings/:id" element={<ListingShow />} />
            <Route
              path="/listings/new"
              element={
                <ProtectedRoute>
                  <ListingCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listings/:id/edit"
              element={
                <ProtectedRoute>
                  <ListingEdit />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
