import React from 'react';
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


function Menus() {
  return (
    <Router>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>My Hotel</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="User" id="collasible-nav-dropdown" style={{padding :'0px 10px 0px 10px'}}>
          <NavDropdown.Item eventKey="1.1" href="/AddUser">Add User</NavDropdown.Item>
          <NavDropdown.Item eventKey="1.2" href="/ViewUser">View User</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Room" id="collasible-nav-dropdown" style={{padding :'0px 10px 0px 10px'}}>
          <NavDropdown.Item eventKey="2.1"  href="AddRoom">Add Room</NavDropdown.Item>
          <NavDropdown.Item eventKey="2.2" href="ViewRoom">View Room</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Reservation" id="collasible-nav-dropdown" style={{padding :'0px 10px 0px 10px'}}>
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
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Switch>    
          
          <Route exact path='/Login'  component={Login} />
          <Route exact path='/AddUser'  component={AddUser} />
          <Route exact path='/ViewUser'  component={ViewUser} />
          <Route exact path='/AddRoom'  component={AddRoom} />
          <Route exact path='/ViewRoom'  component={ViewRoom} />
          <Route exact path='/MakeReservation'  component={MakeReservation} />
          <Route exact path='/ViewReservation'  component={ViewReservation} />
    </Switch>    
  </Router>
  );
}

export default Menus;