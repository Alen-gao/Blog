var  db = require('./db');

function User(user){
	this.username = user.username;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

User.getUser = function(name, callback){
	db.open(function(err, db){
		if(err) return callback(err);
		db.createCollection('user', {safe: true}, function(err, collection){

			if(err){
				db.close();
				return callback(err);
			}

			collection.findOne({'username': name}, function(err, user){
				db.close();
				if(err) return callback(err);
				callback(null, user);

			});

		});

	});
}

User.prototype.saveUser = function(callback){
	
    var obj = {
		username: this.username,
		password: this.password,
		email: this.email
	}
	
	db.open(function(err, db){
		
		if(err) return callback(err);
		db.createCollection('user', {safe:true}, function(err, collection){

			if(err){
				mongodb.close();
				return callback(err);
			} 
			collection.insert(obj, {safe:true},  function(err, user){
				mongodb.close();
				if(err)	return callback(err);

				callback(null, user[0]);

			});

		});

	});
}


// /*上传图像*/
// var cpUploads = upload.fields([
// 	{ name: 'thumbnail' }	
// ])
// router.post('/file-upload', cpUploads, function(req, res){
// 	//console.log(req.files);
// 	async.each(req.files.thumbnail,function(row, next){
// 		var tmpPath = row.path;
// 		var targetPath = 'public/images/pic/' + row.originalname;

// 		fs.rename(tmpPath, targetPath , function(err) {
// 	        if(err) return next(err)
// 	        //删除临时文件
// 	        fs.unlink(tmpPath, function(){
// 	            if(err) return next(err);
// 	            next()
// 	        })
// 	    })

// 	}, function(err){
// 		if (err) return res.redirect('/error')
//         res.redirect('/admin');
// 	});
	
// });

// module.exports = router;
