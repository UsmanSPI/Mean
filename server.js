var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var database;
var dberror = 'dberror';

MongoClient.connect(url, function(err, db) {
	
  if (err){ throw err;}
  
   database = db.db("mydb");
   dberror='connect';
});


var listenserver= express();
listenserver.use(bodyParser.json());
listenserver.use(bodyParser.urlencoded({ extended: true }));

listenserver.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

listenserver.post('/signup',function(req,res){
	console.log('client called',req.body);
	
	var servicemessage='failure';
	
	var mydata ={
		'username':req.body.username,
		'passowrd': req.body.password,
		'email':req.body.email,
		'phone':req.body.phonenumber
	} 
	if(dberror=='connect'){
	database.collection('mean').insertOne(mydata,function(err,resp){
		if(err){console.log(err.message);return;
		}else{
			servicemessage='success';
		}
		
		var jsondata={
		'message':servicemessage,
		'data':'',
		'sessioned':true
		
	}
	
	
	
	res.end(JSON.stringify(jsondata));
	})	
	}
	
	
	
});


var server = listenserver.listen(8081, function () {

    console.log("server listening" );
})






