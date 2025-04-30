import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Notyf } from 'notyf';

const Register = () => {
  const notyf = new Notyf();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!(email && password && confirmPassword && firstName && lastName));
  }, [email, password, confirmPassword, firstName, lastName]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notyf.error("Passwords don't match");
      return;
    }

    if (!email.includes('@')) {
      notyf.error('Invalid Email');
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Registration failed');
        }
        notyf.success('Registration successful');
        // Handle redirection or success state here
      })
      .catch(error => {
        notyf.error(error.message || 'An error occurred during registration');
      });
  };

  const sectionStyle = {
    backgroundColor: '#f5f7fa',
    padding: '2rem 1rem',
    borderRadius: '10px',
  };

  const titleStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '600',
    fontSize: '1.75rem',
    color: '#333',
    marginBottom: '1.5rem',
  };

  return (
    <Container style={sectionStyle}>
      <h2 style={titleStyle} className="text-center">Register</h2>

      <Card className="border mx-auto" style={{
        maxWidth: '500px',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Row>
    <Col>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ borderRadius: '8px', fontSize: '0.95rem' }}
        />
      </Form.Group>
    </Col>
  </Row>
  
  <Row>
    <Col>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ borderRadius: '8px', fontSize: '0.95rem' }}
        />
      </Form.Group>
    </Col>
  </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '8px', fontSize: '0.95rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '8px', fontSize: '0.95rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderRadius: '8px', fontSize: '0.95rem' }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isButtonDisabled}
              style={{
                width: '100%',
                padding: '0.6rem',
                fontSize: '1rem',
                borderRadius: '6px',
                backgroundColor: '#0056b3',
                border: 'none',
              }}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="text-center mt-3">
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Click here</Link> to login.
      </div>
    </Container>
  );
};

export default Register;
