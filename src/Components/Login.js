import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';


function Login() {
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="4"></Col>
            <Col xs lg="4">
              <Container>
                <Form classNames="form-horizontal" onSubmit={ alert('Submitted') }>
                  <h1 style={{textAlign:"center", paddingTop:'80px', paddingBottom:'15px' }}>Login</h1>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="control-label">Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"  />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"   />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Container>
            </Col>
            <Col xs lg="4"></Col>
          </Row>
  );
}

export default Login;
