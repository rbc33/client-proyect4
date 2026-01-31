import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";


const NavBar = () => {
  const {isLoggedIn, logoutUser } = useContext(AuthContext)
  const isActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "btn btn-ghost text-slate-500 dark:text-slate-500 text-2xl"
      : "btn btn-ghost text-2xl hover:text-slate-500 hover:dark:text-slate-500";

  const isActiveStyleAuth = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "btn btn-ghost text-slate-500 dark:text-slate-500 text-xl"
      : "btn btn-ghost text-xl hover:text-slate-500 hover:dark:text-slate-500";
  
  return (
    <div className="navbar bg-base-100 shadow-md mb-5 rounded-box">
      <div className="navbar-start mr-5">
        
        <Link to="/" className="btn btn-ghost gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          <p className="text-2xl font-semibold">IronApts</p>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink className={isActiveStyle} to="/">
              Home
            </NavLink>
          </li>
          <li>
            {isLoggedIn &&<NavLink className={isActiveStyle} to="/newbooking">
              Book
            </NavLink>}
          </li>
          <li>
            {isLoggedIn && <NavLink className={isActiveStyle} to="/newapartment">
              New Apartment
            </NavLink>}
          </li>
          <li>
            <NavLink className={isActiveStyle} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost  focus:bg-slate-300 dark:focus:bg-slate-600">
            <FaRegUserCircle className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-slate-300 dark:bg-slate-700 rounded-box w-52"
          >
        {!isLoggedIn && <li><NavLink className={isActiveStyleAuth} to="/signup">
          Sign up
        </NavLink></li>}
        {!isLoggedIn && <li><NavLink className={isActiveStyleAuth} to="/login">
          Log in
        </NavLink></li>}
            
              {isLoggedIn && <li><NavLink className={isActiveStyleAuth} to="/profile">
          User
        </NavLink></li>}
            
            
        {isLoggedIn && <li><button className={"btn btn-ghost text-xl hover:text-slate-500 hover:dark:text-slate-500"} onClick={() => logoutUser()}>Log Out</button></li>}
            
           
          </ul>
        </div>
        
        <ThemeToggle />
      </div>
      <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden focus:bg-slate-300 dark:focus:bg-slate-600">
            <GiHamburgerMenu className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-slate-300 dark:bg-slate-700 rounded-box w-52"
          >
            <li>
              <NavLink to="/"><p className="text-xl">Home</p></NavLink>
            </li>
            <li>
              <NavLink to="/newbooking"><p className="text-xl">Book</p></NavLink>
            </li>
            <li>
              <NavLink to="/newapartment"><p className="text-xl">New Apartment</p></NavLink>
            </li>
            <li>
              <NavLink to="/about"><p className="text-xl">About</p></NavLink>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default NavBar;
