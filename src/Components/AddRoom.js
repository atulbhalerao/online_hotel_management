import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

function AddRoom() {
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form classNames="form-horizontal">
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>Add Room</h1>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Room Number" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Floor Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Floor Number" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Room Type" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Capacity
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Capacity" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Rate
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Rate" required />
                        </Col>
                        
                    </Form.Group>
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Amenities
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check type="checkbox" label="AC" />
                            <Form.Check type="checkbox" label="Wi-Fi" />
                            <Form.Check type="checkbox" label="TV" />
                            <Form.Check type="checkbox" label="Telephone" />
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

export default AddRoom;
