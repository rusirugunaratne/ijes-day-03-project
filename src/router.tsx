import {createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CutomerPage";
import StocksPage from "./pages/StocksPage";
import OrdersPage from "./pages/OrdersPage";
import PrivateRoutes from "./pages/PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "/about", element: <AboutPage/>},
            {path: "/contact", element: <ContactPage/>},
            {path: "/login", element: <LoginPage/>},
            {
                element: <PrivateRoutes/>,
                children: [
                    {path: "/dashboard", element: <DashboardPage/>},
                    {path: "/dashboard/customers", element: <CustomerPage/>},
                    {path: "/dashboard/stocks", element: <StocksPage/>},
                    {path: "/dashboard/orders", element: <OrdersPage/>},
                ]
            }
        ]
    }
])

export default router