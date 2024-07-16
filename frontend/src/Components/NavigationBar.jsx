import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function NavigationBar() {
  const categories = [
    "business",
    "sports",
    "entertainment",
    "technology",
    "science",
    "health",
  ];
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/everything">
                <Nav.Link>Top headlines</Nav.Link>
              </LinkContainer>
              {categories.map((category) => (
                <LinkContainer key={category} to={`/category/${category}`}>
                  <Nav.Link>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
