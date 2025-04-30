import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  if (!productProp) {
    return null;
  }

  const { _id, name, description, price, imageUrl } = productProp;
  const placeholderImage = '/tempImage.png'; // <-- Use public folder image here

  return (
    <Card 
      id={_id} 
      className="product-card mb-3 h-100 d-flex flex-column mx-3"
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
        width: '100%',
        height: '200px'
      }}>
        <a 
          href={imageUrl ? `https://postimg.cc/${imageUrl.split('/').find(segment => segment.length > 7)}` : '#'} 
          target='_blank' 
          rel="noopener noreferrer"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img 
            src={imageUrl || placeholderImage}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              backgroundColor: 'white'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </a>
      </div>

      <Card.Body className="flex-grow-1">    
        <Card.Title>
          <Link 
            to={`/products/${_id}`}
            style={{ 
              color: '#0d6efd',
              textDecoration: 'underline',
              fontWeight: '600',   // Slightly bold for better readability
            }}
          >
            {name}
          </Link>
        </Card.Title>
        <Card.Text style={{ color: '#555', fontSize: '1rem', lineHeight: '1.5' }}>{description}</Card.Text>
      </Card.Body>

      <Card.Text className="px-3 mb-2">
        <span style={{ 
          fontSize: '1.2rem',  // Slightly larger price for emphasis
          color: '#FF6B00',
          fontWeight: '700',   // Bold price for a techy, premium feel
        }}>₱{price}</span>
      </Card.Text>

      <Card.Footer 
        className="bg-light border-top text-start"
        style={{ borderRadius: '0', borderTop: 'none' }}
      >
        <Link 
          className="btn btn-primary" 
          to={`/products/${_id}`}
          style={{ 
            borderRadius: '8px',  // Rounded button for a modern touch
            padding: '0.5rem 1.5rem',  // Spacious padding for comfort
            textTransform: 'uppercase',  // Uppercase text for a more serious look
          }}
        >
          Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
