import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Modal } from 'react-bootstrap';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch user details');
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            setDetails({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              mobileNo: data.mobileNo
            });
          } else {
            alert('User not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          alert('Something went wrong, kindly contact us for assistance.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);  // Remove user.id dependency

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Loading...</h3>
      </Container>
    );
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/products" />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <Container className="mt-5 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <Card className="mb-4" style={{ backgroundColor: '#f5f7fa', borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body className="text-center">
                <Card.Title className="mb-4" style={{ color: '#2e3b4e', fontWeight: 'bold' }}>Profile</Card.Title>
                {details && (
                  <>
                    <Card.Text className="mb-4" style={{ fontSize: '1.1rem' }}>
                      <strong>{details.firstName} {details.lastName}</strong>
                    </Card.Text>
                    <hr className="bg-light" />
                    <Card.Text className="mt-4" style={{ color: '#6c757d' }}>
                      <strong>Contacts</strong>
                    </Card.Text>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                      <li>Email: {details.email}</li>
                      <li>Mobile No: {details.mobileNo}</li>
                    </ul>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Button 
        style={{ 
          backgroundColor: '#8B008B',
          border: 'none',
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '20px',
          zIndex: 1000,
          borderRadius: '50px',
          padding: '10px 20px',
          fontSize: '1rem'
        }}
        onClick={() => setShowResetPassword(true)}
      >
        Reset Password
      </Button>
      <ResetPassword 
        show={showResetPassword} 
        onHide={() => setShowResetPassword(false)}
      />
    </div>
  );
}
