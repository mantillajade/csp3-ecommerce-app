import { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then(res => res.json())
      .then(data => {
        // Create array of indices and shuffle it
        const indices = Array.from({ length: data.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Take first 6 indices and create preview components
        const featured = indices
          .slice(0, 6)
          .map(index => ({
            ...data[index],
            key: data[index]._id
          }));

        setPreviews(featured);
      });
  }, []);

  // Light background to contrast with the Banner component
  const sectionStyle = {
    backgroundColor: '#f5f7fa',  // Light background for contrast
    padding: '5rem 2rem',         // Adequate padding
    borderRadius: '12px',         // Rounded corners for modern look
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',  // Light shadow
  };

  const titleStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '600',            // Lighter weight for the title
    fontSize: '2.5rem',           // Slightly smaller font size for contrast
    color: '#333',                // Darker text for readability
    marginBottom: '3rem',         // Increased margin for better separation
  };

  return (
    <Container style={sectionStyle}>
      <h2 style={titleStyle} className="text-center">Featured Products</h2>
      <Row className="g-4">
        {previews.map(product => (
          <PreviewProducts 
            data={product} 
            key={product.key} 
            breakPoint={4}
          />
        ))}
      </Row>
    </Container>
  );
}
