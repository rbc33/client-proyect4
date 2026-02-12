import { useContext, useEffect, type PropsWithChildren } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsPrivate({ children }: PropsWithChildren) {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
useEffect(() => {
  authenticateUser();
}, []);  
if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }

}