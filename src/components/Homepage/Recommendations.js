
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";

const Recommendations = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/listings");
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">Recommended Items</h2>
      <Row>
        {listings.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={item.images[0] || "https://via.placeholder.com/150"}
                alt={item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description.substring(0, 80)}...</Card.Text>
                <Card.Text><strong>Price:</strong> ${item.price}</Card.Text>
                <Card.Text><strong>Category:</strong> {item.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recommendations;
