import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

// import "./Home.css";

const Home = () => {
    return <div>
        <Navbar />
        <Outlet />
    </div>
}

export default Home;