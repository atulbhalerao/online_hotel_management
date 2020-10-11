import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Login from './Components/Login';
import Menus from './Components/Menus';
import { useHistory } from 'react-router-dom'

let KEY_ID = 'HOTEL.USER'
function App() {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(()=>{
    GetUserSession();
  },[]);

  useEffect(()=>{
    GetUserSession();
  },[user.userid]);

  const GetUserSession = ()=>{
    let localVal =localStorage.getItem(KEY_ID);
    if(localVal)
    {
      var usr = JSON.parse(localVal);
      //console.dir(usr)
      if(usr && usr.userid && usr.userid > 0){
        setUser(usr);
        //console.dir(usr)
      }
      else{
        setUser({})
      }
    }
    else{
      setUser({})
    }
  }
  
  return (
    <>
    {/* <Menus user = {user} ></Menus>  */}
      <div style={{ display : (user.userid > 0? '' : 'none') }}>
        <Menus ></Menus> 
      </div>
      <div style={{ display : (user.userid > 0? 'none' : '') }} >
        <Login></Login>
      </div>
        {/* { user.userid > 0 ? <Menus></Menus> : <Login></Login> } */}
    </>
  );
}

export default App;
