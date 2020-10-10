import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'

let initForm = {
    userid  : 0, firstname : '',
    lastname : '', gender : 'Male',
    email : '', mobileno : '',
    pan : '', username : '',
    password : '', usertypeid : 0,
    departmentid : 0, IsActive : true,
    rdMale : true, rdFemale : false
};

function AddUser(props) {
    const dbObj = new DataAccess();
    const [departments, setDepartments] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [formData, setFormData] = useState(initForm);
    let sql =''

    useEffect(()=>{
        fillDropDown();
        if(props.match.params.id)
        {
            GetUserDetails(props.match.params.id)
        }
    },[]);

    const fillDropDown = ()=>{
        //Initial Page Load Data
        let sql = "SELECT 0 AS DEPARTMENT_ID, '--SELECT--' AS DEPARTMENT UNION " +
        "SELECT DEPARTMENT_ID, DEPARTMENT FROM DEPARTMENT";

        dbObj.ExecuteSQL(sql, [], (tx, result)=> { 
        fillControlData(result.rows, 'DEPARTMENT') }, 
        (tx, result)=> {  });

        sql = "SELECT 0 AS USER_TYPE_ID, '--SELECT--' AS USER_TYPE UNION " +
        "SELECT USER_TYPE_ID, USER_TYPE FROM USER_TYPE";
        dbObj.ExecuteSQL(sql, [], (tx, result)=> { 
        fillControlData(result.rows, 'USER_TYPE') }, 
        (tx, result)=> {  });
        //Initial Page Load Data
    }

    const GetUserDetails = (usrId) =>{
        sql = "SELECT USER_ID, FIRST_NAME, LAST_NAME, GENDER, EMAIL_ID, MOBILE_NO, " +
            "PAN_NO, USERNAME, PASSWORD, USER_TYPE, DEPARTMENT_ID, IS_ACTIVE " +
            "FROM USER WHERE USER_ID = " + usrId
            
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
           
            var result = res.rows;
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                let controlData = {
                    userid  : item.USER_ID, firstname : item.FIRST_NAME,
                    lastname : item.LAST_NAME, gender : item.GENDER,
                    email : item.EMAIL_ID, mobileno : item.MOBILE_NO,
                    pan : item.PAN_NO, username : item.USERNAME,
                    password : item.PASSWORD, usertypeid : item.USER_TYPE,
                    departmentid : item.DEPARTMENT_ID, IsActive : (item.IS_ACTIVE == 1 ? true : false),
                    rdMale : (item.GENDER == 'Male' ? true : false), rdFemale : (item.GENDER == 'Female' ? true : false)
                }
                setFormData(controlData);
                console.dir(controlData);
            }
        }, 
        (tx, result)=> { });
    }

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
        //e.persist();
        if(e.target.id === 'chkMale' && e.target.checked === true)
        {
            setFormData({...formData, gender: 'Male', rdMale : true, rdFemale : false});  
        }
        else if(e.target.id === 'chkFemale' && e.target.checked === true)
        {
            setFormData({...formData, gender: 'Female', rdMale : false, rdFemale : true});  
        }
        else if(e.target.id === 'IsActive')
        {
            setFormData({...formData, IsActive: e.target.checked});  
        }
        else if(e.target.id === 'usertypeid')
        {
            setFormData({...formData, usertypeid: e.target.selectedOptions[0].id});  
        }
        else if(e.target.id === 'departmentid')
        {
            setFormData({...formData, departmentid: e.target.selectedOptions[0].id}); 
        }
        else{
            setFormData({...formData, [e.target.id]: e.target.value});  
        }
        //console.dir(e.target);
        //console.dir(formData);
    } 

    const InsertUserData = (e)=>
    {
        e.preventDefault();
        let sql = "";
        if(formData.userid > 0)
        {
            sql ="UPDATE USER SET FIRST_NAME ='" + formData.firstname + "', " +
                "LAST_NAME = '" + formData.lastname + "', GENDER = '" + formData.gender + "', " +
                "EMAIL_ID = '" + formData.email + "', MOBILE_NO = '" + formData.mobileno + "', " +
                "PAN_NO = '" + formData.pan + "', USERNAME = '" + formData.username + "', " +
                "PASSWORD = '" + formData.password + "', USER_TYPE = " + formData.usertypeid + ", " +
                "DEPARTMENT_ID = " + formData.departmentid + ", IS_ACTIVE = " + formData.IsActive + " " +
                "WHERE USER_ID = " + formData.userid

            dbObj.ExecuteSQL(sql, [], 
                (tx, result)=> { console.dir(result) }, 
                (tx, result)=> { console.dir(result) });
        }
        else
        {
            if(formData.usertypeid > 0 && formData.departmentid > 0)
            {
                sql = "INSERT INTO USER (FIRST_NAME, LAST_NAME, GENDER, EMAIL_ID, MOBILE_NO, "+
                "PAN_NO, USERNAME, PASSWORD, USER_TYPE, DEPARTMENT_ID, IS_ACTIVE)" +
                "VALUES ('"+ formData.firstname +"', '"+ formData.lastname +"', '"+ formData.gender +"', " + 
                "'"+ formData.email +"', '"+ formData.mobileno + "', '"+ formData.pan + "', " +
                "'"+ formData.username +"', '" + formData.password +"', "+ formData.usertypeid + ", "+ formData.departmentid + ", " + 
                formData.IsActive + ")";
                localStorage.setItem("query", sql)
                dbObj.ExecuteSQL(sql, [], 
                    (tx, result)=> { setFormData({...formData, userid: result.insertId})}, 
                    (tx, result)=> { console.dir(result) });
            }
            else
            {
                alert('Please select department and usertype');
                return false;
            }
        }
        
    }
    
  return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal" onSubmit={InsertUserData}>
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
                            <Form.Check inline label="Male" type='radio' name="gender" id='chkMale' onChange={ onChange } checked={formData.rdMale} />
                            <Form.Check inline label="Female" type='radio' name="gender" id='chkFemale' onChange={ onChange } checked={formData.rdFemale} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Email Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="Email address" id="email" onChange={ onChange } value={formData.email}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Mobile No
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Mobile number" id="mobileno"  onChange={ onChange } value={formData.mobileno}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            PAN Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="PAN number" id="pan"  onChange={ onChange } value={formData.pan}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="User name" id="username" onChange={ onChange } value={formData.username}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Password
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Password" id="password" onChange={ onChange } value={formData.password}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" id="usertypeid" 
                                value = {formData.usertypeid} 
                                onChange={e => setFormData({...formData, usertypeid: e.currentTarget.value})} >
                                {
                                    userTypes.map((item, index)=>{
                                        return (
                                            <option key={item.key} id={item.key} value={item.key}>{item.value}</option>
                                        )
                                    })
                                } 
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Department
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" required id="departmentid" 
                                value = {formData.departmentid} 
                                onChange={e => setFormData({...formData, departmentid: e.currentTarget.value})} >                                
                                {
                                    departments.map((item, index)=>{
                                        return (
                                            <option key={item.key} id={item.key} value={item.key}>{item.value}</option>
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
                            <Form.Check type="checkbox" label="Is Active" id='IsActive' onChange={ onChange } checked = {formData.IsActive} defaultChecked={formData.IsActive}  />
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
