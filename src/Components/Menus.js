import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './Login';
import AddUser from './AddUser';
import ViewUser from './ViewUser';
import AddRoom from './AddRoom';
import ViewRoom from './ViewRoom';
import MakeReservation from './MakeReservation';
import ViewReservation from './ViewReservation';

const KEY_ID = 'HOTEL.USER'
let initUser = {
  username : '',
  usertype : ''
}
function Menus(props) {
  
  const[user, setUser] = useState(initUser)

  useEffect(()=>{
    let localVal =localStorage.getItem(KEY_ID);
    if(localVal)
    {
      var usr = JSON.parse(localVal);
      if(usr && usr.userid && usr.userid > 0){
        let _user = {
          ...usr,
          useraccess : (usr.usertype =='ADMIN' || usr.usertype =='SUPER ADMIN' ? true : false),
          roomaccess : (usr.usertype =='ADMIN' || usr.usertype =='SUPER ADMIN' || usr.usertype =='MANAGER' ? true : false),
          reservationaceess :(usr.usertype =='ADMIN' || usr.usertype =='SUPER ADMIN' || usr.usertype =='MANAGER'|| usr.usertype =='RECEPTIONIST' ? true : false)
        }
        setUser(_user);
      }
    }
  },[])

  const removeUserSession = ()=>{
    //localStorage.setItem(KEY_ID, '');
    localStorage.removeItem(KEY_ID);
  }

  console.dir(props)
  return (
    <Router>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>My Hotel</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="User" id="collasible-nav-dropdown" 
          style={{padding :'0px 10px 0px 10px', display : (user.useraccess ? '' : 'none')}}>
          <NavDropdown.Item eventKey="1.1" href="/AddUser">Add User</NavDropdown.Item>
          <NavDropdown.Item eventKey="1.2" href="/ViewUser">View User</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Room" id="collasible-nav-dropdown" 
          style={{padding :'0px 10px 0px 10px', display : (user.roomaccess ? '' : 'none')}}>
          <NavDropdown.Item eventKey="2.1"  href="AddRoom">Add Room</NavDropdown.Item>
          <NavDropdown.Item eventKey="2.2" href="ViewRoom">View Room</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Reservation" id="collasible-nav-dropdown" 
          style={{padding :'0px 10px 0px 10px', display : (user.reservationaceess ? '' : 'none')}}>
          <NavDropdown.Item eventKey="3.1" href="MakeReservation">Make Reservation</NavDropdown.Item>
          <NavDropdown.Item eventKey="3.2" href="ViewReservation">View Reservation</NavDropdown.Item>
        </NavDropdown>
        {/* <Nav.Link ><NavLink  to={'/Login'} >Login</NavLink ></Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
      <Nav>
        <Nav.Link eventKey={2} href="Login" onClick={removeUserSession}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    <Switch>    
          {/* <Route exact path='/Login'  component={Login} /> */}
          <Route exact path='/AddUser'  component={AddUser} />
          <Route exact path='/AddUser/:id'  component={AddUser} />
          <Route exact path='/ViewUser'  component={ViewUser} />
          <Route exact path='/AddRoom'  component={AddRoom} />
          <Route exact path='/AddRoom/:id'  component={AddRoom} />
          <Route exact path='/ViewRoom'  component={ViewRoom} />
          <Route exact path='/MakeReservation'  component={MakeReservation} />
          <Route exact path='/MakeReservation/:id'  component={MakeReservation} />
          <Route exact path='/ViewReservation'  component={ViewReservation} />
    </Switch>    
  </Router>
  );
}

export default Menus;