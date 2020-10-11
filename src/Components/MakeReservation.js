import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Table } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { useHistory } from 'react-router-dom'

let initForm = {
    reservationid : 0, roomid : 0, reservationroomid : 0,
    checkin : '', checkout : '',
    noofguest : 1, guestid : 0,  
    firstname : '', lastname : '',
    address : '', email : '', mobileno : ''
};

function MakeReservation(props) {
    const dbObj = new DataAccess();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState({});
    const [formData, setFormData] = useState(initForm);
    const history = useHistory();
    let sql =''

    const RedirectToPage = (pageName)=>{
        const pages = ['adduser','viewuser','addroom', 'viewuser', 'makereservation', 'viewreservation'];
        if(pages.indexOf(String(pageName).toLocaleLowerCase()) > -1)
        {
            history.push('/' + pageName);
        }
    }

    useEffect(()=>{
        PopulateAvailableRooms();
    },[formData.checkin,formData.checkout]);

    useEffect(()=>{
        if(formData.roomid > 0) {
            GetRoomDetails(formData.roomid)
        }
        else {
            setRoom({})
        }
    },[formData.roomid]);

    useEffect(()=>{
        if(props.match.params.id)
        {
            RedirectToPage(props.match.params.id);
            PopulateReservationDetails(props.match.params.id)
        }
    },[]);

    const onChange = (e) => {  
        //e.persist();
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
                console.dir(arr)
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

    const SaveReservationDetails = (e)=>{
        e.preventDefault();
        if(formData.reservationid > 0)
        {
            
            if(formData.roomid > 0)
            {
                sql = "UPDATE RESERVATION_ROOM SET ROOM_ID =" + formData.roomid + ", " +
                "RESERVATION_ID = " + formData.reservationid + " " +
                "WHERE RESERVATION_ROOM_ID = " + formData.reservationroomid

                dbObj.ExecuteSQL(sql, [], 
                    (tx, result)=> { },               
                    (tx, result)=> { console.dir(sql);console.dir(result)}
                )
            }
            else {
                alert('Please select room');
            }
            let sql1 = "UPDATE GUEST SET FIRST_NAME ='" + formData.firstname + "', " +
                "LAST_NAME = '" + formData.lastname + "', " +
                "ADDRESS = '" + formData.address + "', " +
                "EMAIL_ID = '" + formData.email + "', " +
                "MOBILE_NO = '" + formData.mobileno + "' " +
                "WHERE GUEST_ID = " + formData.guestid

            dbObj.ExecuteSQL(sql1, [], 
                (tx, result)=> { },               
                (tx, result)=> {console.dir(sql1);console.dir(result)}
            )

            let sql2 = "UPDATE RESERVATION SET CHECK_IN ='" + formData.checkin + "', " +
                "CHECK_OUT = '" + formData.checkout + "', " +
                "NO_OF_GUEST = " + formData.noofguest + " " +
                "WHERE RESERVATION_ID = " + formData.reservationid

                dbObj.ExecuteSQL(sql2, [], 
                    (tx, result)=> { alert('Record saved successfully.') },               
                    (tx, result)=> { console.dir(sql2);console.dir(result)}
                )
        }
        else
        {
            sql = "INSERT INTO GUEST (FIRST_NAME, LAST_NAME, ADDRESS, EMAIL_ID, MOBILE_NO) " +
            "VALUES('" + formData.firstname + "', '" + formData.lastname + "', " +
            "'" + formData.address + "','" + formData.email + "','" + formData.mobileno + "')"

            dbObj.ExecuteSQL(sql, [], 
                (tx, result)=> { 
                    setFormData({...formData, guestid: result.insertId})
                    sql = "INSERT INTO RESERVATION(GUEST_ID, CHECK_IN, CHECK_OUT, NO_OF_GUEST) " + 
                        "VALUES(" + result.insertId + ", '" + formData.checkin + "', '" + formData.checkout + "', " + formData.noofguest +")"
                    
                    dbObj.ExecuteSQL(sql, [],
                        (tx, result)=>{
                            //Insert Reservation Mapping
                            setFormData({...formData, reservationid: result.insertId})
                            sql = "INSERT INTO RESERVATION_ROOM(RESERVATION_ID, ROOM_ID) " + 
                                "VALUES(" + result.insertId + ", " + formData.roomid + ")"
                            dbObj.ExecuteSQL(sql, [],
                                (tx, result)=>{
                                    setFormData({...formData, reservationroomid: result.insertId})
                                    alert('Data saved successfully');
                                },
                                (tx, result)=>{
                                    alert('Something went wrong'); 
                                }
                            )
                            //Insert Reservation Mapping
                        },
                        (tx, result)=>{
                            alert('Something went wrong'); 
                        }
                    )   
                }, 
                (tx, result)=> { alert('Something went wrong'); });
        }
    }
    
    const clearControlState = (e)=>{
        history.push('/MakeReservation');
        setFormData(initForm);
    }

    const PopulateReservationDetails= (id)=>{
        sql = "SELECT R.RESERVATION_ID, RM.ROOM_ID, RM.RESERVATION_ROOM_ID, " +
            "R.CHECK_IN, R.CHECK_OUT, R.NO_OF_GUEST, R.GUEST_ID, " +
            "G.FIRST_NAME, G.LAST_NAME, G.ADDRESS, G.EMAIL_ID, G.MOBILE_NO " +
            "FROM RESERVATION R LEFT JOIN GUEST G ON R.GUEST_ID = R.GUEST_ID " +
            "LEFT JOIN RESERVATION_ROOM RM ON R.RESERVATION_ID = RM.RESERVATION_ID " +
            "WHERE R.RESERVATION_ID = " + id
        
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
        
            var result = res.rows;
            console.dir(result)
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                let controlData = {
                    reservationid : item.RESERVATION_ID,
                    roomid : item.ROOM_ID,
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
                };
                
                setFormData(controlData);
                //console.dir(controlData)
            }
        }, 
        (tx, result)=> { });
    }

    return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal" onSubmit={ SaveReservationDetails }>
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
                            <Form.Control type="number" placeholder="Guest" id="noofguest" onChange = {onChange} value = {formData.noofguest} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Guest Details
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Col sm="12">
                            
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                    <tr>
                                        <td><Form.Control type="text" id="firstname" value = {formData.firstname} 
                                            onChange= {onChange}
                                            name = "firstname" placeholder="First name" required /></td>
                                        <td><Form.Control type="text" id="lastname"  value = {formData.lastname} 
                                            onChange= {onChange}
                                            name = "lastname" placeholder="Last name" required /></td>
                                        <td><Form.Control type="text" id="mobileno"  value = {formData.mobileno}
                                            onChange= {onChange}
                                            name = "mobileno" placeholder="Mobile" required /></td>
                                        <td><Form.Control type="email" id="email" value = {formData.email} 
                                            onChange= {onChange}
                                            name = "email" placeholder="Email" required /></td>
                                        <td><Form.Control type="text" id="address"  value = {formData.address}
                                            onChange= {onChange} 
                                            name = "address" placeholder="Address" required /></td>
                                    </tr>
                                </thead>
                            </Table>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm="4" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button> &nbsp;&nbsp;
                            <Button variant="primary" type="Button" onClick={clearControlState}>
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
