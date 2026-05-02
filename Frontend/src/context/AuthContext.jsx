import { useState } from "react";
import { createContext } from "react";
import { setAccessToken } from "../API/interceptor";
import { useEffect } from "react";
import { refreshToken } from "../API/auth.api";
import { getProfile } from "../API/user.api";
import { useContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user, token) => {
    setUser(user);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Check if user exists in localStorage
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedToken);
        }

        // Only try to refresh if we have a stored token
        if (storedToken) {
          const data = await refreshToken();
          setAccessToken(data.accessToken);

          // Update user data if needed
          if (!storedUser) {
            const profile = await getProfile();
            setUser(profile.user);
            localStorage.setItem("user", JSON.stringify(profile.user));
          }
        }
      } catch (error) {
        console.log("Token refresh failed, clearing auth data");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        setUser,
        setAccessToken,
        login,
        logout,
        loading,
        setLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
