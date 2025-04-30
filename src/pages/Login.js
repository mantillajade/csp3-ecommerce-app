import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const notyf = new Notyf();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const authenticate = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      notyf.error('Invalid Email');
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    })
    .then(data => {
      if (data.access) {
        notyf.success('Login successful');
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        window.dispatchEvent(new Event('tokenChange'));
        setEmail('');
        setPassword('');
      }
    })
    .catch(error => {
      if (error.message === "No Email found") {
        notyf.error('Email does not exist');
      } else if (error.message === "Email and password do not match") {
        notyf.error('Incorrect email or password');
      } else {
        notyf.error('Login failed. Please try again.');
      }
    });
  };

  function retrieveUserDetails(token) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      });
    })
    .catch(error => {
      notyf.error('Failed to retrieve user details');
      console.error('Error:', error);
    });
  }

  return (
    user.id !== null ? 
    <Navigate to="/products" /> :
    <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '90vh' }}>
      <div className="col-md-6 mt-5"> {/* Adjusted margin top to move form higher */}
        <h2 className="text-center mb-4" style={{ color: '#2C3E50' }}>Log In</h2>
        <Card className="border" style={{ borderRadius: '0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Card.Body>
            <Form onSubmit={authenticate}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    borderRadius: '0',  // Sharp edges for consistency
                    border: '1px solid #ddd',
                    backgroundColor: '#f9f9f9'  // Light background for inputs
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    borderRadius: '0',  // Sharp edges for consistency
                    border: '1px solid #ddd',
                    backgroundColor: '#f9f9f9'  // Light background for inputs
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isButtonDisabled}
                  style={{ 
                    width: 'auto', 
                    borderRadius: '0', 
                    backgroundColor: '#8B008B', 
                    borderColor: '#8B008B',
                    padding: '10px 20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  // Button shadow for contrast
                  }} 
                >
                  Log In
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-3" style={{ fontSize: '14px' }}>
          Don't have an account yet? <Link to="/register" style={{ color: '#8B008B' }}>Click here</Link> to register.
        </div>
      </div>
    </Container>
  );
};

export default Login;
