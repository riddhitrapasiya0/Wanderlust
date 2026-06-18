import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data.user);
      } catch (err) {
        if (err.response?.status !== 401) {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
