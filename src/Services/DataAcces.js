import React from 'react';

const db  = openDatabase('HotelMagnt', '1.0', 'Hotel Management Database', 2 * 1024 * 1024); 
//console.dir(db);
class DataAccess
{
    //TABLE STRUCUTRE 

    SelectData = (sqlQuery, successCallback, errorCallback) =>
    {
        //console.dir(sqlQuery)
        db.transaction(function (tx) {
            tx.executeSql(sqlQuery, [], successCallback, errorCallback);
        });
    }

    //InsertData = 
    //https://james-priest.github.io/100-days-of-code-log-r2/CH16-Offline1-WebSQL.html

}
export default DataAccess;