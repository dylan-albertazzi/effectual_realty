import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import logo from '../images/FT_Realty_Logo.png'; 
export default function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(props.initialOpen);
  //adding for test
  return (
    <div>
      <Navbar className="bg-dark" light>
              <NavbarBrand href="/" className="mr-auto p-3 text-main" data-test="NavbarBrand">
                  <img
                className="w-50 mt-4"
                src={
                  logo
                }
                alt="Logo"
              />
      
        </NavbarBrand>
        <NavbarToggler
          onClick={() => setIsOpen(!isOpen)}
          className="mr-2 custom-toggler"
          light="true"
        />
        <Collapse isOpen={isOpen} navbar>
          <Link to="/">
            <Nav navbar className="py-2">
              Search Listings
            </Nav>
          </Link>
          <Link to="/manage-listing">
            <Nav navbar className="py-2">
              Manage Listings
            </Nav>
          </Link>
        </Collapse>
          </Navbar>
        
    </div>
  );
}
