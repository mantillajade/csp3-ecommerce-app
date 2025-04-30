import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({
      id: null,
      isAdmin: false
    });
  };

  const navbarStyle = {
    backgroundColor: '#1f2326',  // Darker background for a more techy look
    padding: '0.5rem 1rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    fontFamily: "'Roboto', sans-serif",  // Modern font
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    transition: 'color 0.3s ease',  // Smooth color transition on hover
  };

  const linkHoverStyle = {
    color: '#0d8ee6',  // Neon blue color on hover for a techy look
  };

  const hamburgerStyle = {
    width: '30px',
    height: '30px',
    position: 'relative',
    padding: '0',
    border: 'none',
    background: 'transparent',
    zIndex: '999', // Make sure hamburger icon is above everything
  };

  const hamburgerLineStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: 'white',
    display: 'block',
    position: 'absolute',
    borderRadius: '3px',
    transition: 'all .3s ease-in-out',
  };

  return (
    <Navbar expand="lg" style={navbarStyle} variant="dark">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" style={linkStyle}>
          The Zuitt Shop
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={hamburgerStyle}
        >
          <span style={{...hamburgerLineStyle, top: '25%'}}></span>
          <span style={{...hamburgerLineStyle, top: '50%', transform: 'translateY(-50%)'}}></span>
          <span style={{...hamburgerLineStyle, bottom: '25%'}}></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && user.isAdmin ? (
              <Nav.Link as={NavLink} to="/products" style={linkStyle} activeStyle={linkHoverStyle}>
                Admin Dashboard
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/products" style={linkStyle} activeStyle={linkHoverStyle}>
                Products
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {user && user.id !== null ? (
              <>
                {!user.isAdmin && (
                  <>
                    <Nav.Link as={NavLink} to="/cart" style={linkStyle} activeStyle={linkHoverStyle}>
                      Cart
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders" style={linkStyle} activeStyle={linkHoverStyle}>
                      Orders
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/profile" style={linkStyle} activeStyle={linkHoverStyle}>
                      Profile
                    </Nav.Link>
                  </>
                )}
                <Nav.Link 
                  as={NavLink} 
                  to="/logout" 
                  onClick={handleLogout} 
                  style={linkStyle} 
                  activeStyle={linkHoverStyle}
                >
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" style={linkStyle} activeStyle={linkHoverStyle}>
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" style={linkStyle} activeStyle={linkHoverStyle}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
