import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from "react-router-dom";

export default function App() {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}