import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to='/login' />

  return <Outlet />
}

export default PrivateRoutes
