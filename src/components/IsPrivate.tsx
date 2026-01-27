import { useContext, type PropsWithChildren } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsPrivate({ children }: PropsWithChildren) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }

}