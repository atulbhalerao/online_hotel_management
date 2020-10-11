import React, {useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { BrowserRouter as Router, Switch, Route, NavLink, useHistory } from "react-router-dom";
import ViewReservation from './ViewReservation'


let inituser = {
  userid : 0,
  username : '', password : '',
  usertype : '', rememberme : false,
  error : false,
};
let KEY_ID = 'HOTEL.USER'

function Login(props) {
  const dbObj = new DataAccess();
  const [user, setUser] = useState(inituser)
  const history = useHistory();
  
  
  const onLoginClick =(e)=>{
    //e.preventDefault();
    if(user && user.username.toLocaleLowerCase() == 'admin' && user.password == 'Admin')
    {
      let _user = {
        userid : 10001,
        username : user.username,
        password : user.password,
        usertype : 'SUPER ADMIN',
        error : false,
      }
      setUser(_user)
      CreateLoginSession(_user);
    }
    else
    {
      let sql= "SELECT U.USER_ID, U.USERNAME, U.PASSWORD, UT.USER_TYPE " +
        "FROM USER U INNER JOIN USER_TYPE UT ON U.USER_TYPE = UT.USER_TYPE_ID " +
        "WHERE U.USERNAME = '" + user.username + "' AND IS_ACTIVE = true"
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
          let result = res.rows;
          if(result.length > 0 && user.password == result[0].PASSWORD)
          {
            let usr ={
              userid : result[0].USER_ID,
              username : result[0].USERNAME,
              //password : result[0].PASSWORD,
              usertype : result[0].USER_TYPE,
              error : false,
            };
            setUser(usr)
            CreateLoginSession(usr);
          }
          else{
            setUser({error: true}); 
          }
        }, 
        (tx, result)=> { setUser({error: true}); });
    }
  }
  const onChange = (e) => {  
    setUser({...user, [e.target.id]: e.target.value, error : false}); 
  }

  const CreateLoginSession = (usr)=>{
    localStorage.setItem(KEY_ID, JSON.stringify(usr));
    //console.dir(props)
  }

  return (
          <Row className="justify-content-md-center">
            <Col xs lg="4"></Col>
            <Col xs lg="4">
              <Container>
                <Form className="form-horizontal" onSubmit={ onLoginClick}>
                  <h1 style={{textAlign:"center", paddingTop:'80px', paddingBottom:'15px' }}>Login</h1>
                  <Form.Group >
                    <Form.Label className="control-label">Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" id="username" onChange = {onChange} value = {user.username} required />
                  </Form.Group>
                  
                  <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" id="password" onChange = {onChange} value = {user.password}  required />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.Check type="checkbox" id="rememberme" label="Check me out" onChange={ onChange } checked = {user.rememberme} />
                  </Form.Group> */}
                  <Form.Group style={{display : (user.error? '' : 'none')}}>
                    <Form.Label style={{color: 'red'}}> <i>Invalid user credentials</i></Form.Label>
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
