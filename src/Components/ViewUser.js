import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { useHistory } from 'react-router-dom'

let initSearchCriteria = {
    name : '',
    username : '',
    usertypeid : 0
}
function ViewUser() {
    const dbObj = new DataAccess();
    const [searchCriteria, setSearchCriteria] =  useState(initSearchCriteria);
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    let sql = "";
    const history = useHistory();

    useEffect(()=>{
        fillDropDown();
        PopulateUsers();  
    }, []);

    const PopulateUsers = ()=>{

        sql = "SELECT U.USER_ID, U.FIRST_NAME, U.LAST_NAME, U.GENDER, U.EMAIL_ID, U.MOBILE_NO, " +
            "PAN_NO, U.USERNAME, U.PASSWORD, UT.USER_TYPE, U.DEPARTMENT_ID, U.IS_ACTIVE " +
            "FROM USER U LEFT JOIN USER_TYPE UT ON U.USER_TYPE = UT.USER_TYPE_ID " +
            "WHERE (U.FIRST_NAME LIKE '" + searchCriteria.name +"%' OR U.LAST_NAME LIKE '" + searchCriteria.name +"%') "+
            "AND U.USERNAME LIKE '" + searchCriteria.username +"%'" +
            "AND U.USER_TYPE = " + (searchCriteria.usertypeid == 0 ? 'U.USER_TYPE' : searchCriteria.usertypeid)
        //console.log(sql);
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
            let arr = [];
            var result = res.rows;
            
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                arr.push({
                    userid : item.USER_ID,
                    firstname : item.FIRST_NAME,
                    lastname : item.LAST_NAME,
                    gender : item.GENDER,
                    username : item.USERNAME,
                    mobileno : item.MOBILE_NO,
                    email : item.EMAIL_ID,
                    usertype : item.USER_TYPE,
                    isactive : item.IS_ACTIVE ? 'Yes' : 'No',
                })
            }
            setUsers(arr);            
        }, 
        (tx, result)=> { });
    }

    const fillDropDown = ()=>{
        sql = "SELECT 0 AS USER_TYPE_ID, '--SELECT--' AS USER_TYPE UNION " +
        "SELECT USER_TYPE_ID, USER_TYPE FROM USER_TYPE";
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
            let arr = [];
            var result = res.rows;
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                arr.push({key : item.USER_TYPE_ID, value : item.USER_TYPE})
            }                
            setUserTypes(arr)
        }, 
        (tx, result)=> {  });
    }

    const onChange = (e) => {  
        //e.persist();
        if(e.target.id === 'usertypeid')
        {
            setSearchCriteria({...searchCriteria, usertypeid: e.target.selectedOptions[0].id});  
        }
        else{
            setSearchCriteria({...searchCriteria, [e.target.id]: e.target.value});  
        }
        // console.dir(e.target);
        // console.dir(searchCriteria);
    } 

    const resetControlState = ()=>{
        setSearchCriteria(initSearchCriteria);
    }

    const PopulateUsersList = (e)=>{
        e.preventDefault();
        PopulateUsers();
    }

    const handleOnUserSelect = (id) => {
        console.dir(id)
        history.push('/AddUser/' + id);
      };

    const handleDeleteEvent = (id)=>{
        sql = "DELETE FROM USER WHERE USER_ID = " + id;
        dbObj.ExecuteSQL(sql, [], (tx, res)=> {
            var usrList = users.filter(usr=> usr.userid != id); 
            setUsers(usrList);
            alert('Record deleted successfully');
        }, 
        (tx, result)=> { 
            alert('Something went wrong');
        });
    }
    return (
          <Row className="justify-content-md-center">
            {/* <Col xs lg="1"></Col> */}
            <Col xs lg="11">
              {/* <Container> */}
                <Form className="form-horizontal" style={{paddingBottom: '20px'}} onSubmit={PopulateUsersList}>
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>View User</h1>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Name
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="name" id="name" onChange={ onChange } value={ searchCriteria.name }  />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" placeholder="user name" id="username" onChange={ onChange } value={ searchCriteria.username } />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control as="select" id="usertypeid" 
                                value = {searchCriteria.usertypeid} 
                                onChange={e => setSearchCriteria({...searchCriteria, usertypeid: e.currentTarget.value})} >
                                {
                                    userTypes.map((item, index)=>{
                                        return (
                                            <option key={item.key} id={item.key} value={item.key}>{item.value}</option>
                                        )
                                    })
                                } 
                            </Form.Control>
                        </Col>
                        <Col sm="3">
                            <Button variant="primary" type="submit">
                                Search
                            </Button> 
                            &nbsp;
                            <Button variant="primary" type="button" onClick={ resetControlState }>
                                Clear
                            </Button> 
                        </Col>
                    </Form.Group>
                </Form>
              {/* </Container> */}
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style={{ width : '5%'}}></th>
                    <th style={{ width : '5%'}}></th>
                    <th style={{ width : '12%'}}>First Name</th>
                    <th style={{ width : '12%'}}>Last Name</th>
                    <th style={{ width : '7%'}}>Gender</th>
                    <th style={{ width : '12%'}}>Username</th>
                    <th style={{ width : '11%'}}>Mobile No</th>
                    <th>Email</th>
                    <th style={{ width : '8%'}}>User Type</th>
                    <th style={{ width : '7%'}}>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                 {
                    users.map((item, index)=>{
                        return (
                            <tr key= {item.userid}>
                                <td>
                                    <Button variant="primary" type="Button" id ={item.userid} size="sm" onClick={ () => handleOnUserSelect(item.userid) }>
                                            Select
                                    </Button> 
                                </td>
                                <td>
                                    <Button variant="primary" type="Button" id ={item.userid} size="sm" onClick={ () => handleDeleteEvent(item.userid) }>
                                            Delete
                                    </Button> 
                                </td>
                                <td style={{wordBreak : "break-all"}}>{item.firstname}</td>
                                <td style={{wordBreak : "break-all"}}>{item.lastname}</td>
                                <td>{item.gender}</td>
                                <td style={{wordBreak : "break-all"}}>{item.username}</td>
                                <td>{item.mobileno}</td>
                                <td style={{wordBreak : "break-all"}}>{item.email}</td>
                                <td>{item.usertype}</td>
                                <td>{item.isactive}</td>
                            </tr>
                        )
                    })
                 }
                   
                </tbody>
                </Table>
            </Col>
            {/* <Col xs lg="1"></Col> */}
          </Row>
  );
}

export default ViewUser;
