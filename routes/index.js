var express = require('express');
var fs = require('fs');
var async= require('async');
var user = require('../modules/userdb');
var article = require('../modules/articledb');
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
	var username = req.body.username;
	var password = req.body.password;
	// var md5 = crypto.createHash('md5'),
 //        password = md5.update(req.body.password).digest('hex');
    user.getUser(username, function(err, user){
    	if (!user) {
	        res.send({ok:0, result: '没有此用户！'});
	        return;
      	}
      	if(user.password != password){
      		res.send({ok:0, result: '密码不正确,请确认密码！'});
      		return;
      	}

      	res.send({ok:1, result: user});


    });

});

router.post('/Publish/Article', function(req, res){
	var title = req.body.title;
	var content = req.body.content;

	var newArticle = new article({
		title: title,
		content: content
	});

	//链接数据库查询用户
	newArticle.saveArticle(function(err){
		if(err){
			res.send({ok:0, result: "发布失败！"});
			return ;
		}
		res.send({ok:1, result: "发布成功！"});
	});
	// db.open(function(err, db){
	// 	if(!err){
	// 		db.createCollection( 'article', {safe:true}, function(err, collection){
	// 			if(!err){
	// 				obj = {
	// 					"title": title,
	// 					"content": content
	// 				}
	// 				collection.insert(obj, function(err, result){
	// 					if(!err && result){
	// 						// res.send({ok:1, data:result});
	// 					}
						
	// 				});
	// 			}
	// 		});
	// 	}
	// });

});

router.post('/Article/query', function(req, res){
	//链接数据库查询用户
	article.getArticle(function(err, data){
		if(err){
			res.send({ok:0, result:"获取文章失败！"});
			return;
		}
		res.send({ok:1, result: data});

	});
	// db.open(function(err, db){
	// 	if(!err){
	// 		db.createCollection('article', {safe:true}, function(err, collection){
	// 			if(!err){
	// 				collection.find().toArray(function(err,result){
 //                  		if(!err && result){
	// 						res.send({ok:1, data:result});
	// 					}
 //               		 }); 
	// 				// collection.find(function(err, result){
						
						
	// 				// });
	// 			}
	// 		});
	// 	}
	// });

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
