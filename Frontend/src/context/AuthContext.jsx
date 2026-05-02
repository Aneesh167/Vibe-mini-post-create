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
  };
  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await refreshToken();
        setAccessToken(data.accessToken);
        const profile = await getProfile();
        setUser(profile.user);
      } catch (error) {
        console.log("not logged in");
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
