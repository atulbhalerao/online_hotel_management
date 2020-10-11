import React from 'react';

const db  = openDatabase('HotelMagnt', '2.0', 'Hotel Management Database', 5 * 1024 * 1024); 

// db.transaction(function(tx) {

//     //CREATE DEPARTMENT TABLE
//     tx.executeSql('CREATE TABLE IF NOT EXISTS DEPARTMENT (' +
//             'DEPARTMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'DEPARTMENT TEXT)');
//     //CREATE DEPARTMENT TABLE

//     //INSERT INTO DEPARTMENT TABLE
//     tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('ADMIN')");
//     tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('SALES')");
//     tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('SUPPORT')");
//     //INSERT INTO DEPARTMENT TABLE

//     //CREATE USER_TYPE TABLE
//     tx.executeSql('CREATE TABLE IF NOT EXISTS USER_TYPE (' +
//             'USER_TYPE_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'USER_TYPE TEXT)');
//     //CREATE DEPARTMENT TABLE

//      //INSERT INTO DEPARTMENT TABLE
//      tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('ADMIN')");
//      tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('MANAGER')");
//      tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('RECEPTIONIST')");
//      //INSERT INTO DEPARTMENT TABLE

//     //CREATE USER TABLE
//     tx.executeSql('CREATE TABLE IF NOT EXISTS USER (' +
//             'USER_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'FIRST_NAME TEXT, ' +
//             'LAST_NAME TEXT, ' +
//             'GENDER TEXT, ' +
//             'EMAIL_ID TEXT, ' +
//             'MOBILE_NO TEXT, ' +
//             'PAN_NO TEXT, ' +
//             'USERNAME TEXT, ' +
//             'PASSWORD TEXT, ' +
//             'USER_TYPE TEXT, ' +
//             'DEPARTMENT_ID INTEGER, ' +
//             'IS_ACTIVE INTEGER)');
//     //CREATE USER TABLE

//     //CREATE USER ROOM
//     tx.executeSql('CREATE TABLE IF NOT EXISTS ROOM (' +
//             'ROOM_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'ROOM_NO TEXT, ' +
//             'FLOOR_NO TEXT, ' +
//             'ROOM_TYPE TEXT, ' +
//             'CAPACITY INTEGER, ' +
//             'RATE INTEGER)');
//     //CREATE USER ROOM

//     //CREATE USER GUEST
//     tx.executeSql('CREATE TABLE IF NOT EXISTS GUEST (' +
//             'GUEST_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'FIRST_NAME TEXT, ' +
//             'LAST_NAME TEXT, ' +
//             'ADDRESS TEXT, ' +
//             'EMAIL_ID TEXT, ' +
//             'MOBILE_NO TEXT)');
//     //CREATE USER GUEST

//     //CREATE USER RESERVATION
//     tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION (' +
//             'RESERVATION_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'GUEST_ID INTEGER, ' +
//             'CHECK_IN TIMESTAMP, ' +
//             'CHECK_OUT TIMESTAMP)');
//     //CREATE USER RESERVATION

//     //CREATE USER RESERVATION_ROOM
//     tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION_ROOM (' +
//             'RESERVATION_ROOM_ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//             'RESERVATION_ID INTEGER, ' +
//             'ROOM_ID INTEGER)');
//     //CREATE USER RESERVATION_ROOM

//     //tx.executeSql('CREATE TABLE IF NOT EXISTS USER (USER_ID unique, FIRST_NAME, LAST_NAME, EMAIL_ID, MOBILE_NO, USERNAME, PASSWORD, USER_TYPE, DEPARTMENT_ID, IS_ACTIVE)');
//     //tx.executeSql('CREATE TABLE IF NOT EXISTS ROOM (ROOM_ID unique, ROOM_NO, FLOOR_NO, ROOM_TYPE, CAPACITY, RATE)');
//     //tx.executeSql('CREATE TABLE IF NOT EXISTS GUEST (GUEST_ID unique, FIRST_NAME, LAST_NAME, ADDRESS, EMAIL_ID, MOBILE_NO)');
//     //tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION (RESERVATION_ID unique, GUEST_ID, CHECK_IN, CHECK_OUT)');
//     //tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION_ROOM (RESERVATION_ROOM_ID unique, RESERVATION_ID, ROOM_ID)');
// })

class DataAccess
{
    //TABLE STRUCUTRE 

    ExecuteSQL = (sqlQuery, data, successCallback, errorCallback) =>
    {
        //console.dir(sqlQuery)
        db.transaction(function (tx) {
            tx.executeSql(sqlQuery, data, successCallback, errorCallback);
        });
    }

    CreateDBSchema = ()=>{
        
        db.transaction(function(tx) {
            //CREATE DEPARTMENT TABLE
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEPARTMENT (' +
                'DEPARTMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT, DEPARTMENT TEXT)');
            //CREATE DEPARTMENT TABLE

            //INSERT INTO DEPARTMENT TABLE
            tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('ADMIN')");
            tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('SALES')");
            tx.executeSql("INSERT INTO DEPARTMENT (DEPARTMENT) VALUES ('SUPPORT')");
            //INSERT INTO DEPARTMENT TABLE
            
            //CREATE USER_TYPE TABLE
            tx.executeSql('CREATE TABLE IF NOT EXISTS USER_TYPE (' +
                'USER_TYPE_ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_TYPE TEXT)');
            //CREATE DEPARTMENT TABLE

            //INSERT INTO DEPARTMENT TABLE
            tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('ADMIN')");
            tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('MANAGER')");
            tx.executeSql("INSERT INTO USER_TYPE (USER_TYPE) VALUES ('RECEPTIONIST')");
            //INSERT INTO DEPARTMENT TABLE

            //CREATE USER TABLE
            tx.executeSql('CREATE TABLE IF NOT EXISTS USER (' +
                'USER_ID INTEGER PRIMARY KEY AUTOINCREMENT, FIRST_NAME TEXT, LAST_NAME TEXT, GENDER TEXT, MOBILE_NO TEXT, ' +
                'EMAIL_ID TEXT, PAN_NO TEXT, USERNAME TEXT, PASSWORD TEXT, USER_TYPE TEXT, DEPARTMENT_ID INTEGER, IS_ACTIVE INTEGER)');
            //CREATE USER TABLE

            //CREATE USER ROOM
            tx.executeSql('CREATE TABLE IF NOT EXISTS ROOM (' +
                'ROOM_ID INTEGER PRIMARY KEY AUTOINCREMENT, ROOM_NO TEXT, FLOOR_NO TEXT, ROOM_TYPE TEXT, ' +
                'CAPACITY INTEGER, RATE INTEGER, AMENITIES TEXT)');
            //CREATE USER ROOM

            //CREATE USER GUEST
            tx.executeSql('CREATE TABLE IF NOT EXISTS GUEST (' +
                'GUEST_ID INTEGER PRIMARY KEY AUTOINCREMENT, FIRST_NAME TEXT, LAST_NAME TEXT, ADDRESS TEXT, ' +
                'EMAIL_ID TEXT, MOBILE_NO TEXT)');
            //CREATE USER GUEST  
            
            //CREATE USER RESERVATION
            tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION (' +
                'RESERVATION_ID INTEGER PRIMARY KEY AUTOINCREMENT, GUEST_ID INTEGER, ' +
                'CHECK_IN TIMESTAMP, CHECK_OUT TIMESTAMP, NO_OF_GUEST INTEGER, IS_ACTIVE)');
            //CREATE USER RESERVATION

            //CREATE USER RESERVATION_ROOM
            tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATION_ROOM (' +
                'RESERVATION_ROOM_ID INTEGER PRIMARY KEY AUTOINCREMENT, RESERVATION_ID INTEGER, ROOM_ID INTEGER)');
            //CREATE USER RESERVATION_ROOM            
        })     
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

}
export default DataAccess;