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
                            Name
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="name"  />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="user name" />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                        <Col sm="3">
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Mobile No</th>
                    <th>User Type</th>
                    <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button variant="primary" type="Button" size="sm">
                                    Select
                            </Button> 
                        </td>
                        <td>Atul</td>
                        <td>Bhalerao</td>
                        <td>atulbhalerao</td>
                        <td>9012345678</td>
                        <td>Manager</td>
                        <td>True</td>
                    </tr>
                    <tr>
                        <td>
                            <Button variant="primary" type="Button" size="sm">
                                    Select
                            </Button> 
                        </td>
                        <td>Atul</td>
                        <td>Bhalerao</td>
                        <td>atulbhalerao</td>
                        <td>9012345678</td>
                        <td>Manager</td>
                        <td>True</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
            <Col xs lg="1"></Col>
          </Row>
  );
}

export default ViewRoom;
