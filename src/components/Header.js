import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "../../node_modules/react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = () => {

    const {loggedInUser} = useContext(UserContext)

    const onlineStatus = useOnlineStatus();

    const [btnName, setBtnName] = useState("Login");

    return (
        <div className="flex justify-between items-center bg-white mb-2 shadow-lg">
            <div>
                <img className="w-32" src={LOGO_URL} alt="logo" />
            </div>
            <div className="nav-items">
                <ul className="flex">
                    <li className="px-4">
                        Online Status : {onlineStatus ? "💚" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/contact"}>Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/grocery"}>Grocery</Link>
                    </li>
                    <li className="px-4">Cart</li>
                    <button className="px-4" onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    );
}

export default Header;