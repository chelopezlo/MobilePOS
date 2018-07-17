/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

$(document).ready(function(){
var myDB = null;
//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){

    myDB = window.sqlitePlugin.openDatabase({name: "bellisima.db", location: 'default'});
    myDB.transaction(function(transaction) {
        var createSql = [
        'CREATE TABLE IF NOT EXISTS producto (',
        'id INTEGER',
        ',nombre TEXT NOT NULL',
        ',codigo TEXT NOT NULL',
        ',descripcion TEXT NOT NULL',
        ',PRIMARY KEY(id)',
        ',UNIQUE(nombre, codigo)',
        ');'
        ].join('')

        transaction.executeSql(createSql, [],
            function(tx, result) {
                alert("Table created successfully");
            },
            function(error) {
                  alert("Error occurred while creating the table.");
            });
        });
}
//Create new table
$("#createTable").click(function(){
    myDB.transaction(function(transaction) {
      var createSql = [
        'CREATE TABLE IF NOT EXISTS producto (',
        'id INTEGER',
        ',nombre TEXT NOT NULL',
        ',codigo TEXT NOT NULL',
        ',descripcion TEXT NOT NULL',
        ',PRIMARY KEY(id)',
        ',UNIQUE(nombre, codigo)',
        ');'
      ].join('')

    transaction.executeSql(createSql, [],
        function(tx, result) {
            alert("Table created successfully");
        },
        function(error) {
              alert("Error occurred while creating the table.");
        });
    });
});

//Insert New Data
$("#insertProducto").click(function(){
  var nombre=$("#nombreProducto").val();
  var desc=$("#descProducto").val();
  var codigo=$("#codigoProducto").val();
  //console.log(nombre +"-"+ desc);
  myDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO producto (nombre, codigo, descripcion) VALUES (?,?,?)";
        transaction.executeSql(executeQuery, [nombre,codigo,desc]
            , function(tx, result) {
                   $("#listadoProductos>tbody").html("");
                   myDB.transaction(function(transaction) {
                   transaction.executeSql('SELECT * FROM producto', [], function (tx, results) {
                        var len = results.rows.length, i;
                        $("#rowCount").html(len);
                        for (i = 0; i < len; i++){
                           $("#listadoProductos>tbody").append('<tr><td class="ui-table-priority-2">'+results.rows.item(i).id+'</td><td class="ui-table-priority-2">'+results.rows.item(i).nombre+'</td><td class="ui-table-priority-2">'+results.rows.item(i).codigo+'</td><td class="ui-table-priority-2">'+results.rows.item(i).descripcion+'</td></tr>');
                        }
                        $("#listadoProductos").table("refresh");
                     }, null);
                   });
            },
            function(error){
                 alert('Error occurred');
            });
    });
});

//Display Table Data
$("#showTable").click(function(){
    //$("#listadoProductos>tbody").html("");
    myDB.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM producto', [], function (tx, results) {
      var len = results.rows.length, i;
      $("#rowCount").html(len);
      for (i = 0; i < len; i++){
         $("#listadoProductos>tbody").append('<tr><td class="ui-table-priority-2">'+results.rows.item(i).id+'</td><td class="ui-table-priority-2">'+results.rows.item(i).nombre+'</td><td class="ui-table-priority-2">'+results.rows.item(i).codigo+'</td><td class="ui-table-priority-2">'+results.rows.item(i).descripcion+'</td></tr>');
      }
      $("#listadoProductos").table("refresh");
    }, null);
    });
});

//Delete Data from Database
$(document.body).on('click', '.delete' ,function(){
  var id=this.id;
  myDB.transaction(function(transaction) {
    var executeQuery = "DELETE FROM phonegap_pro where id=?";
    transaction.executeSql(executeQuery, [id],
      //On Success
      function(tx, result) {alert('Delete successfully');},
      //On Error
      function(error){alert('Something went Wrong');});
  });
});


//Delete Tables
$("#update").click(function(){
  var id=$("#id").text();
  var title=$("#title").val();
  var desc=$("#desc").val()
  myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE phonegap_pro SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
      //On Success
      function(tx, result) {alert('Updated successfully');},
      //On Error
      function(error){alert('Something went Wrong');});
  });
});

$("#DropTable").click(function(){
    myDB.transaction(function(transaction) {
        var executeQuery = "DROP TABLE  IF EXISTS phonegap_pro";
        transaction.executeSql(executeQuery, [],
            function(tx, result) {alert('Table deleted successfully.');},
            function(error){alert('Error occurred while droping the table.');}
        );
    });
});

$("#fmrProductos").submit(function(e){
    e.preventDefault();
});

});
