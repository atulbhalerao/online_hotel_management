import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'

let initForm = {
    firstname : '',
    lastname : '',
    gender : '',
    email : '',
    mobileno : '',
    pan : '',
    username : '',
    password : '',
    usertypeid : 0,
    departmentid : 0,
    IsActive : 0
};

function AddUser() {
    const dbObj = new DataAccess();
    const [departments, setDepartments] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(()=>{
        let sql = "SELECT * FROM DEPARTMENT";

        dbObj.SelectData(sql, (tx, result)=> { 
            fillControlData(result.rows, 'DEPARTMENT') }, 
            (tx, result)=> {  });

        sql = "SELECT * FROM USER_TYPE";
        dbObj.SelectData(sql, (tx, result)=> { 
            fillControlData(result.rows, 'USER_TYPE') }, 
            (tx, result)=> {  });

    },[]);

    const fillControlData =(result, type)=>{
        let arr = [];
        
        switch(type)
        {
            case 'DEPARTMENT' :
                //console.dir(controlData);
                for (let i = 0; i < result.length; i++) 
                {
                    let item = result[i];
                    arr.push({key : item.DEPARTMENT_ID, value : item.DEPARTMENT})
                }
               
                setDepartments(arr)
                break;           
            case 'USER_TYPE' :
                for (let i = 0; i < result.length; i++) 
                {
                    console.dir()
                    let item = result[i];
                    arr.push({key : item.USER_TYPE_ID, value : item.USER_TYPE})
                }
                
                setUserTypes(arr)
                break;
            default:
                break;
        }
        
    }
    
    const onChange = (e) => {  
        e.persist();
        setFormData({...formData, [e.target.id]: e.target.value});  
        console.dir(formData);
    } 
    
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal">
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>Add User</h1>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" className="font-weight-bold">
                            First Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="First name" id="firstname" onChange={ onChange } value={formData.firstname} required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Last Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Last name" id="lastname" onChange={ onChange } value={formData.lastname}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Gender
                        </Form.Label>
                        <Col sm="10">
                            <Form.Check inline label="Male" type='radio' name="gender" id='chkMale'  />
                            <Form.Check inline label="Female" type='radio' name="gender" id='chkFemale' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Email Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="Email address" onChange={ onChange } value={formData.email}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Mobile No
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Mobile number" onChange={ onChange } value={formData.mobileno}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            PAN Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="PAN number" onChange={ onChange } value={formData.pan}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="User name" onChange={ onChange } value={formData.username}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Password
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Password" onChange={ onChange } value={formData.password}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" id="usertype">
                            {
                                userTypes.map((item, index)=>{
                                    return (
                                        <option key={item.key} id={item.key}>{item.value}</option>
                                    )
                                })
                            } 
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Department
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" required id="department">
                            {
                                departments.map((item, index)=>{
                                    return (
                                        <option key={item.key} id={item.key}>{item.value}</option>
                                    )
                                })
                            } 
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check type="checkbox" label="Is Active" onChange={ onChange } value={formData.IsActive}  />
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

export default AddUser;
