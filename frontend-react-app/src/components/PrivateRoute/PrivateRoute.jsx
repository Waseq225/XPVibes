import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../../userContext"
import { useContext } from "react";
import { CircularProgress } from "@mui/material";

export const PrivateRoute = () => {
  const { user, userLoading } = useContext(UserContext);
  
  if (userLoading && !user) return <CircularProgress />
  return user ? <Outlet /> : <Navigate to='/login' />
}
