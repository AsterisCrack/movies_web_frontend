import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import GetUserData from "./GetUserData";

export default function Header() {
    const [user, setUser] = useState({});
    GetUserData({setUser});

    return (<header>
        <h1>AG Movies</h1>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Movie List</NavLink>
                </li>
                <li>
                    <NavLink to="/contactInfo">Info</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
                {user.username && (
                    <li>
                        <NavLink to="/user">{user.username}</NavLink>
                    </li>
                )}
                
            </ul>
        </nav>
    </header>)
};