import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../../userContext"
import { useContext } from "react";

export const PrivateRoute = () => {
    const { user, setUser } = useContext(UserContext);
  return user ? <Outlet/>: <Navigate to ='/login'/>
}
