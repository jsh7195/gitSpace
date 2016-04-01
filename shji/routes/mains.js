/**
 * http://usejsdoc.org/
 */
var app = require('../app')

function findData(){
	var rstData;
	var cl = app.client;
	cl.connect('mongodb://localhost/shjimongodb',function(err,db){
		console.log('mongo db fn' + err + +" "+db);
		if(err){
			console.log("monogo db err : " + err)
		}
		else{
			console.log("mongo process start");
//			db.collection("date").insert({"name":"jjanga","age":1225} , function(err,date){
//				console.log(date);
//			})
			db.collection("date").find({}).toArray(function(err,data){
				console.log(data + " what Data ? ")
				this.rstData=data;
				console.log(' this data - ' + this.rstData);
//				rstData = JSON.stringify(data);
//				console.log(JSON.stringify(data,null,'\t'));
				console.log(data.length + ' result length...');
//				console.log(data[0].name + '-> 0 ... key : name');
			})
		}
		
	})
	console.log('return....')
		return this.rstData;
}
exports.main2 = function(req, res,next){
	console.log('this use - - '+req.url)
	var rstData;
	var cl = app.client;
	cl.connect('mongodb://localhost/shjimongodb',function(err,db){
//		console.log('mongo db fn' + err + +" "+db);
		if(err){
			console.log("monogo db err : " + err)
		}
		else{
			console.log("mongo process start");
//			db.collection("date").insert({"name":"jjanga","age":1225} , function(err,date){
//				console.log(date);
//			})
			db.collection("board").find({}).toArray(function(err,data){
//				console.log(data + " what Data ? ")
				this.rstData=data;
				console.log(' this data - ' + this.rstData);
				res.render('main', {rst : data , rst2 : data.length});
			})
		}
		
	})
};
exports.main = function(req, res,next){
	//검사 먼저 하고 main2 실행함;
	console.log('this get - - '+req.url)
	console.log('--- 로그인 검사로직 추후에 추가---');
	var loginUserId = req.params.userId;
	if(loginUserId == undefined || loginUserId == ''){
		console.log('empty user id');
//		res.redirect('/index');
		res.send('input id');
	}
	else{
		console.log('login success')
		next();
	}
};