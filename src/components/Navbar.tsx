import { NavLink } from "react-router-dom"

function Navbar(){
    return(
        <nav className="text-black text-xl flex justify-between items-center w-full h-10 bg-yellow-500">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/auth">Login/Register</NavLink>
        </nav>
    )
}

export default Navbar