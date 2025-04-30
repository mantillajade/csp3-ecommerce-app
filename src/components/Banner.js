import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default function Banner({ data }) {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  if (shouldNavigate) {
    return <Navigate to="/products" />;
  }

  const bannerStyle = {
    backgroundColor: '#101820', // Dark background for a serious techy feel
    padding: '4rem 2rem', // Adequate padding for a spacious look
    color: '#fff', // Light text to contrast the dark background
    borderRadius: '10px', // Smooth rounded corners
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
  };

  const titleStyle = {
    fontFamily: "'Roboto', sans-serif", // Clean modern font
    fontWeight: '700', // Bold title
    fontSize: '3rem', // Larger title for emphasis
  };

  const contentStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontStyle: 'italic',
    fontSize: '1.25rem',
    margin: '1.5rem 0', // Adds space between title and content
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #0d8ee6, #1c7ed6)', // Gradient button for techy feel
    color: '#fff',
    borderRadius: '30px', // Rounded button
    padding: '0.75rem 2rem', // Spacious padding inside the button
    border: 'none',
    fontWeight: '600', // Slightly bolder text for the button
    fontSize: '1rem',
    transition: 'transform 0.3s ease', // Smooth transition effect on hover
  };

  const buttonHoverStyle = {
    transform: 'scale(1.05)', // Slightly increase size on hover for a techy feel
  };

  return (
    <Row className="my-5 text-center" style={bannerStyle}>
      <Col>
        <h1 style={titleStyle}>{data.title}</h1>
        <p style={contentStyle}><em>{data.content}</em></p>
        <Button 
          variant="primary" 
          onClick={() => setShouldNavigate(true)}
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {data.buttonLabel}
        </Button>
      </Col>
    </Row>
  );
}
