import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const TopNav = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">Volico</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '600px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link>
            <NavDropdown title="Settings" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/product">Product</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category">Category</NavDropdown.Item>
              {/*<NavDropdown.Item href="#action4">Brand</NavDropdown.Item>*/}
              <NavDropdown.Item as={Link} to="/supplier">Supplier</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Inventory" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Inventory Status</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Report</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Forecast
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Product Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav