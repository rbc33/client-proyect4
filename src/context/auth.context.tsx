import axios from "axios";
import React, { useState, type PropsWithChildren } from "react";
import { useEffect } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logoutUser: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const API_URL = "http://localhost:5005";

interface AuthResponse {
  data: User;
}

function AuthProviderWrapper(props: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsLoading(true);
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response: AuthResponse) => {
          console.log({ response });
          console.log(response.data);
          setUser(response.data);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.log(error);
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        storeToken,
        authenticateUser,
        user,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };