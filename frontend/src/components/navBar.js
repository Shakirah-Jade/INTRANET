import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../images/tropicallogo.jpg";
import Sidebar from "./sideBar";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        {/* Tropical bank logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <Link to="/">
          <h1>Intranet</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login" className="my-link">
                Login
              </Link>
              <Link to="/signup" className="my-link">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
