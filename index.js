'use strict';

const express = require('express');
const smartcar = require('smartcar');
const mysql = require('mysql');

const app = express();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var connection = mysql.createConnection({
  host     : 'scdbinstance.cmnpmvgfh6o3.us-west-1.rds.amazonaws.com',
  user     : 'admin',
  password : '12345678',
  port     : '3306',
  database : 'Carshare'
});
connection.connect();

const client = new smartcar.AuthClient({
  clientId: '2d410913-60ce-4e5d-830c-759c08b16bed',
  clientSecret: '11c02e2a-0901-4d41-bb51-9190b25b8baf',
  redirectUri: 'http://localhost:8000/exchange',
  scope: ['read_vehicle_info', 'read_location', 'control_security', 'control_security:unlock', 'control_security:lock'],
  testMode: true,
});

let access;

app.get('/homepage',function(req,res) {
  	res.sendfile(__dirname + "/" + "public/homepage/index.html");
});

app.get('/login',function(req,res) {
	res.sendfile(__dirname + "/" + "public/login/logIn.html");
});

app.get('/success',function(req,res) {
    res.sendfile(__dirname + "/" + "public/success/success.html");
})

app.get('/go',function(req,res) {


	var Departure = req.query.Departure1;
	var select1 = req.query.select1;

	var sql = `SELECT * FROM Car_info WHERE current_location = '${Departure}' AND size = '${select1}';`;

  	connection.query(sql,function(err,rows) {

    let result_html = '<ul><li style="height = 222px;font-size: 30px; color: white; font-style: italic;">Smart Share</li>';
        result_html += '<li><a href="/homepage">Homepage</a></li>';
        result_html += '<li style="float:right" onclick=window.location.href="/logIn"><a>Log In</a></li>';
        result_html += '<li style="float:right"><a href="#sign up">Sign Up</a></li></ul>';
        result_html += '<style>body {margin:0; border:0; padding:0;}';
        result_html += 'ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333;}';
        result_html += 'li { float: left; }';
        result_html += 'li a {display: block;color: white; text-align: center; padding: 14px 16px; text-decoration: none;}';
        result_html += 'li a:hover {background-color: #111;}';
        result_html += 'h1 {text-align: center;}</style>';

        result_html += '<center><h1>'+"CarList"+'</h1></center>';
    for (var i = 0; i < rows.length; i++) {
            result_html +='<center><h3>'+"car_id: "+rows[i].car_id+"  Brand: "+rows[i].Brand+"  size: "+rows[i].size+"  age: "+rows[i].age+"  odometer: "+rows[i].odometer+"  price: "+rows[i].price+"  current_location: "+rows[i].current_location+'</h3></center>';
            result_html += '<form action="/success">';
            result_html += '<center><button style="color: grey;" type="button" onclick=window.location.href="/success">Confirm</button>';
            result_html += '</form>';
        }

    // result_html += '<h2>hi</h2>'

    res.send(result_html);

    console.log('finished');
    if (err) throw err;
  });

// res.sendfile(__dirname + "/" + "public/filteredCarList/filteredCarList.html");
});

app.get('/check',function(req,res) {

	var Departure = req.query.Departure2;
	var Destination = req.query.Destination2;

	var select2 = req.query.select2;
	console.log(select2);
	var sql = `SELECT * FROM ride_info WHERE departure = '${Destination}' AND destination ='${Departure}' AND size = '${select2}';`;

	connection.query(sql,function(err,rows) {
			if (rows.length != 0) {
            let result_html = '<ul><li style="height = 222px;font-size: 30px; color: white; font-style: italic;">Smart Share</li>';
                result_html += '<li><a href="/homepage">Homepage</a></li>';
                result_html += '<li style="float:right" onclick=window.location.href="/logIn"><a>Log In</a></li>';
                result_html += '<li style="float:right"><a href="#sign up">Sign Up</a></li></ul>';
                result_html += '<style>body {margin:0; border:0; padding:0;}';
                result_html += 'ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333;}';
                result_html += 'li { float: left; }';
                result_html += 'li a {display: block;color: white; text-align: center; padding: 14px 16px; text-decoration: none;}';
                result_html += 'li a:hover {background-color: #111;}';
                result_html += 'h1 {text-align: center;}</style>';

                result_html += '<center><h1>'+"CarList"+'</h1></center>';
                for (var i = 0; i <rows.length; i++) {
                        result_html+='<center><h3>'+"ride_id: "+rows[i].ride_id+"  user_id: "+rows[i].user_id+"  size: "+rows[i].size+"  departure: "+rows[i].departure+"  destination: "+rows[i].odometer+"  price: "+rows[i].price+"  date: "+rows[i].date+'</h3></center>';
                        // console.log(rows[i]);
                        // arr[i]=rows[i];

                        result_html += '<form action="/success">';
                        result_html += '<center><button style="color: grey;" type="button" onclick=window.location.href="/success">Confirm</button>';
                        result_html += '</form>';
                    }
                // result_html += '<h2>hi</h2>'
                res.send(result_html);

       			console.log('finished');
			} else {	

			let message = "Hire a Driver?";

			let result_html = '<ul><li style="height = 222px;font-size: 30px; color: white; font-style: italic;">Smart Share</li>';
                result_html += '<li><a href="/homepage">Homepage</a></li>';
                result_html += '<li style="float:right" onclick=window.location.href="/logIn"><a>Log In</a></li>';
                result_html += '<li style="float:right"><a href="#sign up">Sign Up</a></li></ul>';
                result_html += '<style>body {margin:0; border:0; padding:0;}';
                result_html += 'ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333;}';
                result_html += 'li { float: left; }';
                result_html += 'li a {display: block;color: white; text-align: center; padding: 14px 16px; text-decoration: none;}';
                result_html += 'li a:hover {background-color: #111;}';
                result_html += 'h1 {text-align: center;}</style>';

                result_html += '<body><h1 style="font-size: 50px; text-align: center;" class="one">' + message + '</h1></body>';
    			result_html += '<form action="/filteredCarList">';
    			result_html += '<center><button style="width: 200px; height: 50px; color: grey; margin-top:600px; margin-left:-50px;" type="button">';
                result_html += 'OK </button>';
    			result_html += '<button style="width: 200px; height: 50px; color: grey; margin-top:600px; margin-left:250px;" type="button"';
                result_html += 'onclick=window.location.href="/homepage"> No Thanks </button></center>';
    			result_html += '</form>';
    			result_html += '<style>.one{position:absolute; width:200px; height:200px; top:50%; left:50%; margin-top:-100px; margin-left:-100px;}</style>';

                res.send(result_html);
			}
			
	
    	       if (err) throw err;

	// res.sendfile(__dirname + "/" + "public/filteredMatchingList/filteredMatchingList.html");
	});

});

app.get('/myTrip',function(req,res) {
    var selectSQL='select * from `Mytrip`';
    var arr=[];
    connection.query(selectSQL,function(err,rows){
        if (err) throw err;
        // console.log(rows.length);
        let result_html = '<ul><li style="height = 222px;font-size: 30px; color: white; font-style: italic;">Smart Share</li>';
        result_html += '<li><a href="/homepage">Homepage</a></li>';
        result_html += '<li style="float:right" onclick=window.location.href="/logIn"><a>Log In</a></li>';
        result_html += '<li style="float:right"><a href="#sign up">Sign Up</a></li></ul>';
            
        result_html += '<style>body {margin:0; border:0; padding:0;}';
        result_html += 'ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333;}';
        result_html += 'li { float: left; }';
        result_html += 'li a {display: block;color: white; text-align: center; padding: 14px 16px; text-decoration: none;}';
        result_html += 'li a:hover {background-color: #111;}';
        result_html += 'h1 {text-align: center;}</style>';

        result_html += '<center><h1>'+"My Trip"+'</h1></center>';
        result_html+='<center><h2>'+"Trip Info"+'</h2></center>';
        for (var i = 0; i <rows.length; i++) {
            result_html+='<center><h3>'+"trip_id: "+rows[i].trip_id+"  ride_id: "+rows[i].ride_id+"  car_id: "+rows[i].car_id+'</h3></center>';

            result_html+='<center><button style="color: grey;" type="button">Detail</button></center>';

            // console.log(rows[i]);
            // arr[i]=rows[i];
        }
        // console.log(arr);
        res.send(result_html);
    });
	// res.sendfile(__dirname + "/" + "public/myTrip/myTrip.html");
});

app.get('/carlogin', function(req, res) {
  const link = client.getAuthUrl();
  res.redirect(link);
});

app.get('/exchange', function(req, res) {
  const code = req.query.code;

  return client.exchangeCode(code)
    .then(function(_access) {
      access = _access;

      res.sendStatus(200);
    });
});

app.get('/vehicle', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);

      return vehicle.info();
    })
    .then(function(info) {
      console.log(info);
      // {
      //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
      //   "make": "TESLA",
      //   "model": "Model S",
      //   "year": 2014
      // }

      res.json(info);
    });
});

app.get('/update', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      return vehicle.location();
    })
    .then(function(response){
      var tnum, snum;
      console.log(response.data.latitude);
      console.log(response.data.longitude);
      connection.query(`SELECT totalcar_number FROM Carshare.Area WHERE area_id = 1;`, function(err, rows, fields){
        tnum = (rows[0].totalcar_number) + 1;
        console.log(tnum);
        connection.query(`UPDATE Carshare.Area SET totalcar_number = ` + tnum + ` WHERE area_id = 1;`);
      });

      connection.query(`SELECT smallcar_number FROM Carshare.Area WHERE area_id = 1;`, function(err, rows, fields){
        snum = (rows[0].smallcar_number) + 1;
        console.log(snum);
        connection.query(`UPDATE Carshare.Area SET smallcar_number = ` + snum + ` WHERE area_id = 1;`);
        res.sendStatus(200);
      });
  });
});

var num;
app.get('/average', function(req, res) {
  connection.query(`SELECT * FROM Carshare.Area WHERE area_id = 1;`, function(err, rows, fields){
    num = rows[0].totalcar_number;
    console.log(num + " cars are available");
    if (num < 5) console.log("One-way is currently unavailable");
    else if (num <= 10) {
      console.log("50 dollars additional fee is required");
      let result_html = '<center><h1>' + "50 dollars additional fee is required" + '</h1></center>';
      res.send(result_html);
      connection.query(`UPDATE Carshare.ride_info SET price = 150 WHERE ride_id = 1;`);
    }
    else if (num > 20) {
      console.log("20 dollars promotion is available");
      let result_html = '<center><h1>' + "20 dollars promotion is available" + '</h1></center>';
      res.send(result_html);
      connection.query(`UPDATE Carshare.ride_info SET price = 80 WHERE ride_id = 1;`);
    }
  });
});

app.post('/unlock', function(req,res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      return vehicle.unlock();
    })
    .then(function(response) {
      console.log(response);
      res.json(response);
    });
});


var server = app.listen(8000,function() {
  console.log("start");
});

