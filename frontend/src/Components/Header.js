import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "../Images/TeamLogo/wkwlgo.png"

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        {/* for large screens */}
        <Navbar />
        {/* for small screens */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
