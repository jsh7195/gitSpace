/**
 * http://usejsdoc.org/
 */

var app = require('../app')

exports.write = function(req,res){
	res.render('write');
}

exports.writeAction = function(req,res){
	dbcon(req,res)
}

exports.selectAction = function(req,res){
	
}

function dbcon(req,res,data){
	console.log(app+ ' this app');
	var cl = app.client;
	cl.connect('mongodb://localhost/shjimongodb',function(err,db){
//		console.log('mongo db fn' + err + +" "+db);
		if(err){
			console.log("monogo db err : " + err)
		}
		else{
			insertBoard(err,db,req,res,data)
		}
		
	})
}
function insertBoard(err,db,req,res,data){
	console.log('data check' + req.body.title)
	db.collection("board").insert({"title":req.body.title,"contents":req.body.contents} , function(err,date){
		if(err){
			console.log(err+' insert error');
		}else{
			console.log(date)
			res.redirect('/main');
		}
	})
}
function myBoard(err,db,req,res){
	
}