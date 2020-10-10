import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DataAccess from '../Services/DataAcces'
import { useHistory } from 'react-router-dom'

let initForm = {
    roomid  : 0, roomno : '',
    floorno : '', roomtype : '',
    capacity : 0, rate : 0,
    ac : false, wifi : false,
    tv : false, telephone : false
};
function AddRoom(props) {
    const dbObj = new DataAccess();
    const [formData, setFormData] = useState(initForm);
    const history = useHistory();
    let sql ='';
    useEffect(()=>{
        if(props.match.params.id)
        {
            GetRoomDetails(props.match.params.id)
        }
    },[]);

    const onChange = (e) => {  
        e.persist();
        if(e.target.type == 'checkbox'){
            setFormData({...formData, [e.target.id]: e.target.checked});
        }
        else {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
    } 

    const InsertRoomData = (e)=>{
        e.preventDefault();
        
        let _amenities = [];
        formData.ac && _amenities.push('AC');
        formData.wifi && _amenities.push('Wi-Fi');
        formData.tv && _amenities.push('Television');
        formData.telephone && _amenities.push('Telephone');

        if(formData.roomid > 0){
            sql = "UPDATE ROOM SET ROOM_NO = '" + formData.roomno + "', " +
                "FLOOR_NO = '" + formData.floorno + "', ROOM_TYPE = '" + formData.roomtype + "', " +
                "CAPACITY = '" + formData.capacity + "', RATE = '" + formData.rate + "', " +
                "AMENITIES = '" + _amenities.join(',') + "' WHERE ROOM_ID = " + formData.roomid

            dbObj.ExecuteSQL(sql, [], 
                (tx, result)=> { alert('Data updated successfully'); }, 
                (tx, result)=> { alert('Something went wrong'); });
        }
        else
        {
            sql ="INSERT INTO ROOM (ROOM_NO, FLOOR_NO, ROOM_TYPE, CAPACITY, RATE, AMENITIES) " +
                "VALUES ('" + formData.roomno + "', '" + formData.floorno + "', "+
                "'" + formData.roomtype + "', '" + formData.capacity + "', '" + formData.rate + "', "+
                "'" + _amenities.join(',') + "')"
            dbObj.ExecuteSQL(sql, [], 
                (tx, result)=> { setFormData({...formData, roomid: result.insertId})
                alert('Data saved successfully');    
            }, (tx, result)=> { alert('Something went wrong'); });
        }
    }

    const clearControlState = (e)=>{
        history.push('/AddRoom');
        setFormData(initForm);
    }

    const GetRoomDetails = (rmId) =>{
        sql = "SELECT ROOM_ID, ROOM_NO, FLOOR_NO, ROOM_TYPE, CAPACITY, RATE, AMENITIES " +
            "FROM ROOM WHERE ROOM_ID = " + rmId
            
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
           
            var result = res.rows;
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                let _amenities = String(item.AMENITIES).split(',')
                let controlData = {
                    roomid  : item.ROOM_ID, roomno : item.ROOM_NO,
                    floorno : item.FLOOR_NO, roomtype : item.ROOM_TYPE,
                    capacity : item.CAPACITY, rate : item.RATE,
                    ac : _amenities.indexOf('AC') == -1 ? false : true, 
                    wifi : _amenities.indexOf('Wi-Fi') == -1 ? false : true, 
                    tv : _amenities.indexOf('Television') == -1 ? false : true, 
                    telephone : _amenities.indexOf('Telephone') == -1 ? false : true
                };
                setFormData(controlData);
            }
        }, 
        (tx, result)=> { });
    }

    return (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col xs lg="8">
              <Container>
                <Form className="form-horizontal"  onSubmit={ InsertRoomData }>
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>Add Room</h1>
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" id="roomno" placeholder="Room Number" onChange={ onChange } value={formData.roomno}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Floor Number
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" id="floorno" placeholder="Floor Number" onChange={ onChange } value={formData.floorno}  required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Room type
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" id="roomtype" placeholder="Room Type" onChange={ onChange } value={formData.roomtype}  required />
                        </Col>
                        <Form.Label column sm="2" className="font-weight-bold">
                            Capacity
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="number" id="capacity" placeholder="Capacity" onChange={ onChange } value={formData.capacity} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Rate
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="number" id="rate" placeholder="Rate" onChange={ onChange } value={formData.rate}  required />
                        </Col>
                        
                    </Form.Group>
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm="2" className="font-weight-bold">
                            Amenities
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check type="checkbox" id="ac" label="AC" onChange={ onChange } checked={formData.ac}  />
                            <Form.Check type="checkbox" id="wifi" label="Wi-Fi" onChange={ onChange } checked={formData.wifi} />
                            <Form.Check type="checkbox" id="tv" label="TV" onChange={ onChange } checked={formData.tv}  />
                            <Form.Check type="checkbox" id="telephone" label="Telephone" onChange={ onChange } checked={formData.telephone}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="4" className="font-weight-bold">
                        </Form.Label>
                        <Col sm="4">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button> &nbsp;&nbsp;
                            <Button variant="primary" type="Button" onClick = {clearControlState}>
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

export default AddRoom;
