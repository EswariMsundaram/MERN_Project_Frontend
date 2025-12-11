import { NavLink } from "react-router-dom"
import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
function Navbar(){
    const auth = useContext(AuthContext);
    const handleLogout = () => {
    auth?.logOut();
  };

  return (
    <nav className="text-black text-xl flex justify-between items-center w-full h-10 bg-yellow-500 p-2">
      <div className="flex gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>

      <div className="flex gap-4">
        {auth?.user ? (
          <>
            <span>Hello, {auth.user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth">Login/Register</NavLink>
        )}
      </div>
    </nav>)
}

export default Navbar