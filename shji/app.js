
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mains = require('./routes/mains')
  , board = require('./routes/board')
  , http = require('http')
  , path = require('path')
  , client = require('mongodb').MongoClient;

exports.client = client;

console.log('ready....')
//client.connect('mongodb://localhost/shjimongodb',function(err,db){
//	console.log('mongo db fn' + err + +" "+db);
//	if(err){
//		console.log("monogo db err : " + err)
//	}
//	else{
//		console.log("mongo process start");
////		db.collection("date").insert({"name":"jjanga","age":1225} , function(err,date){
////			console.log(date);
////		})
//		db.collection("date").find({}).toArray(function(err,data){
//			console.log(JSON.stringify(data,null,'\t'));
//			console.log(data.length + ' result length...');
//			console.log(data[0].name + '-> 0 ... key : name');
//		})
//	}
//	
//})
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/main/:userId', mains.main);
app.use('/main/',mains.main2);

app.get('/write', board.write);
//app.get('/writeAction', board.writeAction);
app.post('/writeAction', board.writeAction);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
