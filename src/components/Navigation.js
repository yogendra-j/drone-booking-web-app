import { Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Droame Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/bookings">Bookings</Nav.Link>
              <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
              <Nav.Link as={Link} to="/drone-shots">Drone Shots</Nav.Link>
              <Nav.Link as={Link} to="/drone-sites">Drone Sites</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navigation;