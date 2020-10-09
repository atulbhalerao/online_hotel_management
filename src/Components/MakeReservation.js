import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

function MakeReservation() {
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal">
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>Make Reservation</h1>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" className="font-weight-bold">
                            First Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="First name" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Last Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Last name" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Gender
                        </Form.Label>
                        <Col sm="10">
                            <Form.Check inline label="Male" type='radio' name="gender" id='chkMale' checked />
                            <Form.Check inline label="Female" type='radio' name="gender" id='chkFemale' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Email Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="Email address" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Mobile No
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Mobile number" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            PAN Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="PAN number" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="User name" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Password
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Password" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Department
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" required>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check type="checkbox" label="Is Active" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="4" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button> &nbsp;&nbsp;
                            <Button variant="primary" type="Button">
                                Cancel
                            </Button>
                        </Col>
                        <Form.Label column sm="4" className="font-weight-bold">
                        </Form.Label>
                    </Form.Group>
                </Form>
              </Container>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
  );
}

// var db = openDatabase('HotelMagnt', '1.0', 'Hotel Management Database', 2 * 1024 * 1024); //TABLE STRUCUTRE 
// db.transaction(function(tx) {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS DEPARTMENT (DEPARTMENT_ID unique, DEPARTMENT)');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS USER (USER_ID unique, FIRST_NAME, LAST_NAME, EMAIL_ID, MOBILE_NO, USERNAME, PASSWORD, USER_TYPE, DEPARTMENT_ID, IS_ACTIVE)');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS ROOM (ROOM_ID unique, ROOM_NO, FLOOR_NO, ROOM_TYPE, CAPACITY, RATE)');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS GUEST (GUEST_ID unique, FIRST_NAME, LAST_NAME, ADDRESS, EMAIL_ID, MOBILE_NO)');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION (RESERVATION_ID unique, GUEST_ID, CHECK_IN, CHECK_OUT)');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION_ROOM (RESERVATION_ROOM_ID unique, RESERVATION_ID, ROOM_ID)');
// })

export default MakeReservation;
