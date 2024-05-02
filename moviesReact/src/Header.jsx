import { NavLink } from "react-router-dom";

export default function Header() {
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
                <li>
                    <NavLink to="/user">User</NavLink>
                </li>
            </ul>
        </nav>
    </header>)
};