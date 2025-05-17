import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";
import {Toaster} from "react-hot-toast";

const Layout = () => {
    return <div className="">
        <Navbar/>
        <Outlet/>
        <Footer/>
        <Toaster
            position="top-right"
        />
    </div>
}

export default Layout