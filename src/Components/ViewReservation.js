import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { useHistory } from 'react-router-dom'

let initSearchCriteria = {
    roomno : '',
    floorno : '',
    capacity : '',
    IsReserved : false
}

function ViewReservation() {
    const dbObj = new DataAccess();
    const [searchCriteria, setSearchCriteria] =  useState(initSearchCriteria);
    const [reservation, setReservation] = useState([]);
    const history = useHistory();
    let sql = "";

    useEffect(()=>{
        PopulateReservationDetails();  
    }, []);

    const PopulateReservationDetails =()=>{
        sql = "SELECT R.RESERVATION_ID, RM.ROOM_ID, ROOM.ROOM_NO, RM.RESERVATION_ROOM_ID, " +
            "R.CHECK_IN, R.CHECK_OUT, R.NO_OF_GUEST, R.GUEST_ID, " +
            "G.FIRST_NAME, G.LAST_NAME, G.ADDRESS, G.EMAIL_ID, G.MOBILE_NO " +
            "FROM RESERVATION R LEFT JOIN GUEST G ON R.GUEST_ID = R.GUEST_ID " +
            "LEFT JOIN RESERVATION_ROOM RM ON R.RESERVATION_ID = RM.RESERVATION_ID " +
            "LEFT JOIN ROOM ROOM ON RM.ROOM_ID = ROOM.ROOM_ID " +
            "WHERE 1 = 1"
            //"WHERE R.RESERVATION_ID = " + id
        
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
        
            var result = res.rows;
            var arr = [];
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                arr.push({
                    reservationid : item.RESERVATION_ID,
                    roomid : item.ROOM_ID,
                    roomno : item.ROOM_NO,
                    reservationroomid : item.RESERVATION_ROOM_ID,
                    checkin : item.CHECK_IN,
                    checkout : item.CHECK_OUT,
                    noofguest : item.NO_OF_GUEST,
                    guestid : item.GUEST_ID, 
                    firstname : item.FIRST_NAME,
                    lastname : item.LAST_NAME,
                    address : item.ADDRESS,
                    email : item.EMAIL_ID,
                    mobileno : item.MOBILE_NO
                });                
            }
            setReservation(arr);
        }, 
        (tx, result)=> { });
    }

    

    const handleOnSelect = (id)=>{
        history.push('/MakeReservation/' + id);
    }

    const handleDeleteEvent = (id)=>{
        sql = "DELETE FROM ROOM WHERE ROOM_ID = " + id;
        // dbObj.ExecuteSQL(sql, [], (tx, res)=> {
        //     var roomList = rooms.filter(r=> r.roomid != id); 
        //     setRooms(roomList);
        //     alert('Record deleted successfully');
        // }, 
        // (tx, result)=> { 
        //     alert('Something went wrong');
        // });
    }

    return (
          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>
            <Col xs lg="10">
              {/* <Container> */}
                <Form className="form-horizontal" style={{paddingBottom: '20px'}}>
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>View Reservation</h1>
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
                        <th style={{ width : '5%'}}></th>
                        <th style={{ width : '5%'}}></th>
                        <th style={{ width : '8%'}}>Room No</th>
                        <th style={{ width : '10%'}}>Check In</th>
                        <th style={{ width : '10%'}}>Check Out</th>
                        <th style={{ width : '10%'}}>No Of Guests</th>
                        <th style={{ width : '15%'}}>Guest Name</th>
                        <th style={{ width : '10%'}}>Mobile No</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                {
                    reservation.map((item, index)=>{
                        return (
                            <tr key= {item.reservationid}>
                                <td>
                                    <Button variant="primary" type="Button" id ={item.reservationid} size="sm" onClick={ () => handleOnSelect(item.reservationid) }>
                                            Select
                                    </Button> 
                                </td>
                                <td>
                                    <Button variant="primary" type="Button" id ={item.reservationid} size="sm" onClick={ () => handleDeleteEvent(item.reservationid) }>
                                            Delete
                                    </Button> 
                                </td>
                                <td >{item.roomno}</td>
                                <td>{item.checkin}</td>
                                <td>{item.checkin}</td>
                                <td >{item.noofguest}</td>
                                <td>{item.firstname + ' ' + item.lastname }</td>
                                <td >{item.mobileno}</td>
                                <td style={{wordBreak : "break-all"}}>{item.address}</td>
                            </tr>
                            )
                        })
                    }
                    
                </tbody>
                </Table>
            </Col>
            <Col xs lg="1"></Col>
          </Row>
  );
}

export default ViewReservation;
