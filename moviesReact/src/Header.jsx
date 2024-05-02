import { NavLink } from "react-router-dom";

export default function Header() {
    return (<header>
        <h1>Tienda</h1>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Listado</NavLink>
                </li>
                <li>
                    <NavLink to="/contactInfo">Información</NavLink>
                </li>
            </ul>
        </nav>
    </header>)
};