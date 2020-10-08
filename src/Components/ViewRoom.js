import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';


function ViewRoom() {
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>
            <Col xs lg="10">
              {/* <Container> */}
                <Form classNames="form-horizontal" style={{paddingBottom: '20px'}}>
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>View Room</h1>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Room No
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="Room Number"  />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Floor
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="Floor" />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Capacity
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="Capacity" />
                        </Col>
                        <Col sm="3" >
                            <Form.Check type="checkbox" label="Is Reserved" sm="6" style={{ display: "inline"}}/>
                            &nbsp; &nbsp;
                            <Button variant="primary" type="submit">
                                Search
                            </Button> 
                        </Col>
                    </Form.Group>
                </Form>
              {/* </Container> */}
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>Room No</th>
                    <th>Floor No</th>
                    <th>Room Type</th>
                    <th>Capacity</th>
                    <th>Rate</th>
                    <th>Reservered From</th>
                    <th>Reservered Till</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button variant="primary" type="Button" size="sm">
                                    Select
                            </Button>
                        </td>
                        <td>1001</td>
                        <td>First</td>
                        <td>1 BHK</td>
                        <td>2 Persons</td>
                        <td>$2500/Day</td>
                        <td>20/10/2020</td>
                        <td>25/10/2020</td>
                    </tr>
                    <tr>
                    <td>
                        <Button variant="primary" type="Button" size="sm">
                                Select
                        </Button>
                        </td>
                        <td>1001</td>
                        <td>First</td>
                        <td>1 BHK</td>
                        <td>2 Persons</td>
                        <td>$2500/Day</td>
                        <td>20/10/2020</td>
                        <td>25/10/2020</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
            <Col xs lg="1"></Col>
          </Row>
  );
}

export default ViewRoom;
