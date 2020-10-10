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

function ViewRoom() {
    const dbObj = new DataAccess();
    const [searchCriteria, setSearchCriteria] =  useState(initSearchCriteria);
    const [rooms, setRooms] = useState([]);
    const history = useHistory();
    let sql = "";

    useEffect(()=>{
        PopulateRooms();  
    }, []);

    const PopulateRooms = ()=>{
        sql = "SELECT R.ROOM_ID, R.ROOM_NO, R.FLOOR_NO, R.ROOM_TYPE, R.CAPACITY, R.RATE, R.AMENITIES, " +
            "STRFTIME('%d-%m-%Y', RS.CHECK_OUT) AS CHECK_OUT, STRFTIME('%d-%m-%Y', RS.CHECK_IN) AS CHECK_IN " +
            "FROM ROOM R LEFT JOIN RESERVATION_ROOM RR ON R.ROOM_ID = RR.ROOM_ID " +
            "LEFT JOIN RESERVATION RS ON RR.RESERVATION_ID = RS.RESERVATION_ID " +
            "WHERE R.ROOM_NO LIKE '" + searchCriteria.roomno + "%' " +
            "AND R.FLOOR_NO LIKE '" + searchCriteria.floorno + "%' " +
            "AND R.CAPACITY LIKE '" + searchCriteria.capacity + "%' " +
            (searchCriteria.IsReserved? "AND RS.CHECK_OUT >= DATETIME('now', 'localtime')" : '') 
        console.dir(sql)
        dbObj.ExecuteSQL(sql, [], (tx, res)=> { 
            let arr = [];
            var result = res.rows;
            
            for (let i = 0; i < result.length; i++) 
            {
                let item = result[i];
                arr.push({
                    roomid : item.ROOM_ID,
                    roomno : item.ROOM_NO,
                    floorno : item.FLOOR_NO,
                    roomtype : item.ROOM_TYPE,
                    capacity : String(item.CAPACITY) + ' Person(s)',
                    rate : '₹ ' + String(item.RATE),
                    reservedfrom : item.CHECK_IN,
                    resertvedtill : item.CHECK_OUT
                })
            }
            setRooms(arr);  
            console.dir(arr)          
        }, 
        (tx, result)=> { });
    }

    const PopulateRoomsList = (e)=>{
        e.preventDefault();
        PopulateRooms();
    }

    const onChange = (e) => {  
        e.persist();
        if(e.target.type === 'checkbox') {
            setSearchCriteria({...searchCriteria, IsReserved: e.target.checked});  
        }
        else {
            setSearchCriteria({...searchCriteria, [e.target.id]: e.target.value});  
        }
    } 

    const handleOnSelect = (id)=>{
        history.push('/AddRoom/' + id);
    }

    const handleDeleteEvent = (id)=>{
        sql = "DELETE FROM ROOM WHERE ROOM_ID = " + id;
        dbObj.ExecuteSQL(sql, [], (tx, res)=> {
            var roomList = rooms.filter(r=> r.roomid != id); 
            setRooms(roomList);
            alert('Record deleted successfully');
        }, 
        (tx, result)=> { 
            alert('Something went wrong');
        });
    }

    const resetControlState = ()=>{
        setSearchCriteria(initSearchCriteria);
    }

    return (
          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>
            <Col xs lg="10">
              {/* <Container> */}
                <Form className="form-horizontal" style={{paddingBottom: '20px'}} onSubmit= { PopulateRoomsList }>
                    <h1 style={{textAlign:"center", paddingTop:'50px', paddingBottom:'15px' }}>View Room</h1>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Room No
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" id="roomno" placeholder="Room Number" value= {searchCriteria.roomno} onChange= { onChange } />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Floor
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" id="floorno" placeholder="Floor" value= {searchCriteria.floorno} onChange= { onChange } />
                        </Col>
                        <Form.Label column sm="1" className="font-weight-bold">
                            Capacity
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" id="capacity"  placeholder="Capacity" value= {searchCriteria.capacity} onChange= { onChange } />
                        </Col>
                        <Col sm="3" >
                            <Form.Check type="checkbox" label="Is Reserved" id="IsReserved" sm="6" 
                                style={{ display: "inline"}} 
                                checked={searchCriteria.IsReserved} onChange= { onChange }/>
                            &nbsp; &nbsp;
                            <Button variant="primary" type="submit">
                                Search
                            </Button> 
                            &nbsp;
                            <Button variant="primary" type="button" onClick = { resetControlState }>
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
                    <th>Room No</th>
                    <th>Floor No</th>
                    <th>Room Type</th>
                    <th>Capacity</th>
                    <th>Rate</th>
                    <th>Reservered From</th>
                    <th>Reservered Till</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.map((item, index)=>{
                            return (
                                <tr key= {item.roomid}>
                                    <td>
                                        <Button variant="primary" type="Button" id ={item.roomid} size="sm" onClick={ () => handleOnSelect(item.roomid) }>
                                                Select
                                        </Button> 
                                    </td>
                                    <td>
                                        <Button variant="primary" type="Button" id ={item.roomid} size="sm" onClick={ () => handleDeleteEvent(item.roomid) }>
                                                Delete
                                        </Button> 
                                    </td>
                                    <td style={{wordBreak : "break-all"}}>{item.roomno}</td>
                                    <td style={{wordBreak : "break-all"}}>{item.floorno}</td>
                                    <td>{item.roomtype}</td>
                                    <td >{item.capacity}</td>
                                    <td>{item.rate}</td>
                                    <td >{item.reservedfrom}</td>
                                    <td>{item.resertvedtill}</td>
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

export default ViewRoom;
