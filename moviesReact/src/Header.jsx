import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import GetUserData from "./GetUserData";

export default function Header() {
    const [user, setUser] = useState({});
    GetUserData({setUser});

    const logout = async () => {
        const response = await fetch("http://127.0.0.1:8000/apps/users/logout/", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setUser({});
        }
    }
    console.log(user);
    return (<header>
        <h1>AG Movies</h1>
        <nav className="header-list">
            <ul>
                <li>
                    <NavLink to="/">Movie List</NavLink>
                </li>
                <li>
                    <NavLink to="/contactInfo">Info</NavLink>
                </li>
                
                <div className="dropdown">
                    <li className="dropbtn">{user.username ? user.username : "User"}</li>
                    <div className="dropdown-content">
                        {user.username && (
                            <>
                            <NavLink to="/user">Config</NavLink>
                            <a onClick={logout}>Logout</a>
                            </>
                        )}
                        {!user.username && (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
                
            </ul>
        </nav>
    </header>)
};