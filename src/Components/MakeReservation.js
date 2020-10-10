import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { useHistory } from 'react-router-dom'

let initForm = {
    reservationid : 0, roomid : 0,
    checkin : '', checkout : '',
    guest : [{
        firstname : '', lastname : '',
        address : '', email : '', mobileno : ''
    }]
};


function MakeReservation() {
    const dbObj = new DataAccess();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState({});
    const [formData, setFormData] = useState(initForm);
    let sql =''

    useEffect(()=>{
        PopulateAvailableRooms();
    },[formData.checkin,formData.checkout]);

    useEffect(()=>{
        if(formData.roomid > 0)
        {
            GetRoomDetails(formData.roomid)
        }
        else
        {
            setRoom({})
        }
    },[formData.roomid]);

    const onChange = (e) => {  
        //e.persist();
        //console.dir(e.target)
        setFormData({...formData, [e.target.id]: e.target.value}); 
    }

    const PopulateAvailableRooms = ()=>{
        if(formData.checkin && formData.checkout)
        {
            let sql = "SELECT 0 AS ROOM_ID, '--SELECT--' AS ROOM_NO UNION " +
                "SELECT R.ROOM_ID, R.ROOM_NO FROM ROOM R LEFT JOIN RESERVATION_ROOM RR ON R.ROOM_ID = RR.ROOM_ID " + 
                " LEFT JOIN RESERVATION RS ON RR.RESERVATION_ID = RS.RESERVATION_ID " + 
                "WHERE (RS.CHECK_IN IS NULL OR (RS.CHECK_IN NOT BETWEEN DATETIME('" + formData.checkin + "') AND DATETIME('" + formData.checkout + "'))) " +
                "AND (RS.CHECK_OUT IS NULL OR (RS.CHECK_OUT NOT BETWEEN DATETIME('" + formData.checkin + "') AND DATETIME('" + formData.checkout + "'))) ";
               
            //console.dir(sql);
            dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
                let result = res.rows;
                let arr = []
                for (let i = 0; i < result.length; i++) 
                {
                    let item = result[i];
                    arr.push({key : item.ROOM_ID, value : item.ROOM_NO})
                }
                setRooms(arr);
            }, 
            (tx, result)=> { console.dir(result) });
        }
    }

    const GetRoomDetails = (rmId) =>{
        sql = "SELECT ROOM_ID, ROOM_NO, FLOOR_NO, ROOM_TYPE, CAPACITY, RATE, AMENITIES " +
            "FROM ROOM WHERE ROOM_ID = " + rmId
            
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
           
            var result = res.rows;
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                let controlData = {
                    roomid  : item.ROOM_ID, roomno : item.ROOM_NO,
                    floorno : item.FLOOR_NO, roomtype : item.ROOM_TYPE,
                    capacity : String(item.CAPACITY) + ' Person(s)', rate : '₹ ' + String(item.RATE),
                    amenities : item.AMENITIES
                };
                setRoom(controlData);
                console.dir(controlData)
            }
        }, 
        (tx, result)=> { });
    }

    return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal">
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>Make Reservation</h1>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Check In
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="date"  id="checkin" onChange = {onChange} value = {formData.checkin} />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Check out
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="date" id="checkout" onChange = {onChange} value = {formData.checkout} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room No
                        </Form.Label>
                        <Col sm="4">
                        <Form.Control as="select" required id="roomid" 
                                value = {formData.roomid} 
                                onChange={e => setFormData({...formData, roomid: e.currentTarget.value})} >                                
                                {
                                    rooms.map((item, index)=>{
                                        return (
                                            <option key={item.key} id={item.key} value={item.key}>{item.value}</option>
                                        )
                                    })
                                } 
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ display : formData.roomid > 0 ? '' : 'none' }} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room Details
                        </Form.Label>
                        <Col sm="10">
                        <Form.Label >
                            Floor : { room.floorno } <br/>
                            Room Type : { room.roomtype } <br/>
                            Capacity : { room.capacity } <br/>
                            Rate : { room.rate } <br/>
                            Amenities : { room.amenities }
                        </Form.Label>                            
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            No of Guest(s)
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="number" placeholder="Guest" required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="User name" required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Password
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Password" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            User Type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Department
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" required>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check type="checkbox" label="Is Active" />
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

export default MakeReservation;
