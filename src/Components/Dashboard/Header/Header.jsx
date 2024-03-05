import { Navbar, Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import "../Dashboard.css";
import logo from "../../../Assets/logo.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <Navbar
          expand="lg"
          className="header-background"
          style={{ height: "60px" }}
        >
          <Navbar.Brand href="/dashboard" className="mx-4">
            <img
              src={logo}
              alt="Logo"
              className="d-none d-lg-block"
              style={{ maxHeight: "40px", marginRight: "10px" }}
            />
          </Navbar.Brand>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end me-4"
          >
            <Nav className="ml-auto">
              <FaUserCircle
                className="d-none d-md-block"
                color="white"
                size={30}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
