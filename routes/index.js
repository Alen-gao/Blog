var express = require('express');
var fs = require('fs');
var  mongodb = require('mongodb');
var async= require('async');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('mydb', server, {safe:true});
var router = express.Router();


var multer  = require('multer');
var upload = multer({ dest: '/public/images/pic'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', layout: 'layout.ejs' });
});
router.get('/blogPage', function(req, res) {
  res.render('blogPage', { title: 'Express', layout: 'layout.ejs' });
});
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express', layout: false});
});
// router.get('/views/main', function(req, res) {
// });
router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Express', layout: false});
});

router.post('/views/main', function(req, res){
	var username = req.body.user;
	var password = req.body.pass;

    console.log(username, password);

	console.log("请求发送成功!")

	//链接数据库查询用户
	db.open(function(err, db){
		if(!err){
			db.createCollection( 'user', {safe:true}, function(err, collection){
				if(!err){
					obj = {
						"username": username,
						"password": password
					}
					collection.findOne(obj, function(err, docs){
						if(!err && docs){
							//将当前的用户写到会话中
				            // req.session.user = currentUser;
				            // req.flash('path', targetPath);
							// res.render('admin', { title: 'Express', layout: false});
							res.send({ok:1, data:docs});
						}
                        else{
                            console.log("用户名或密码错误！");
							res.send({ok:0})
                        }
					});
				}
			});
		}
	});

});

router.post('/Publish/Article', function(req, res){
	var title = req.body.title;
	var content = req.body.content;

	//链接数据库查询用户
	db.open(function(err, db){
		if(!err){
			db.createCollection( 'article', {safe:true}, function(err, collection){
				if(!err){
					obj = {
						"title": title,
						"content": content
					}
					collection.insert(obj, function(err, result){
						if(!err && result){
							// res.send({ok:1, data:result});
						}
						
					});
				}
			});
		}
	});

});

router.post('/Article/query', function(req, res){
	//链接数据库查询用户
	db.open(function(err, db){
		if(!err){
			db.createCollection('article', {safe:true}, function(err, collection){
				if(!err){
					collection.find().toArray(function(err,result){
                  		if(!err && result){
							res.send({ok:1, data:result});
						}
               		 }); 
					// collection.find(function(err, result){
						
						
					// });
				}
			});
		}
	});

});

/*上传图像*/
var cpUploads = upload.fields([
	{ name: 'thumbnail' }	
])
router.post('/file-upload', cpUploads, function(req, res){
	//console.log(req.files);
	async.each(req.files.thumbnail,function(row, next){
		var tmpPath = row.path;
		var targetPath = 'public/images/pic/' + row.originalname;

		fs.rename(tmpPath, targetPath , function(err) {
	        if(err) return next(err)
	        //删除临时文件
	        fs.unlink(tmpPath, function(){
	            if(err) return next(err);
	            next()
	        })
	    })

	}, function(err){
		if (err) return res.redirect('/error')
        res.redirect('/admin');
	});
	
});

module.exports = router;
