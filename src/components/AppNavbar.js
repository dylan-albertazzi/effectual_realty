import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import logo from '../images/FT_Realty_Logo.png'; 
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import {Auth, Hub} from "aws-amplify"
export default function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(props.initialOpen);
  let [user, setUser] = useState(null)
  useEffect(() => {
    let updateUser = async authState => {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, []);
  //adding for test
  return (
    <>
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
          <div className="signout">
            {(user === null ? " ": <AmplifySignOut />)}
          </div>
        </Collapse>
          </Navbar>
        
    </>
  );
}
