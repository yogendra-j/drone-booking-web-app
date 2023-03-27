import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>Welcome to the Droame Portal</h1>
          <p>Select a page from the navigation bar above</p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <h3>Getting Started</h3>
          <p>
            To get started, select a page from the navigation bar above. You can manage bookings, customers, drone shots, and drone sites from this portal.
          </p>
          <p>
            To create a new booking, click the "Create Booking" button on the Bookings page. To edit an existing booking, click the "Edit" button next to the booking on the Bookings page.
          </p>
          <p>
            To create a new customer, click the "Create Customer" button on the Customers page. To edit an existing customer, click the "Edit" button next to the customer on the Customers page.
          </p>
          <p>
            To create a new drone shot type, click the "Create Drone Shot" button on the Drone Shots page. To edit an existing drone shot type, click the "Edit" button next to the drone shot type on the Drone Shots page.
          </p>
          <p>
            To create a new drone site, click the "Create Drone Site" button on the Drone Sites page. To edit an existing drone site, click the "Edit" button next to the drone site on the Drone Sites page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className='mx-2' as={Link} to="/bookings/create">Create Booking</Button>
          <Button className='mx-2' as={Link} to="/customers/create">Create Customer</Button>
          <Button className='mx-2' as={Link} to="/drone-shots/create">Create Drone Shot</Button>
          <Button as={Link} to="/drone-sites/create">Create Drone Site</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;