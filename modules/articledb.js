var  db = require('./db');

function Article(article){
	this.title = article.title;
	this.content = article.content;
}

module.exports = Article;

Article.getArticle = function(callback){

	db.open(function(err, db){
		if(err) return callback(err);

		db.createCollection('article', {safe: true}, function(err, collection){
			if(err){
				db.close();
				return callback(err);
			}

			collection.find().toArray(function(err,result){
          		db.close();
				if(err) callback(err);
				callback(null, result);
       		});

       	});

	});

}

Article.prototype.saveArticle = function(callback){
	var date = new Date();
	var obj = {
		title: this.title,
		content: this.content,
		time:  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
	}

	db.open(function(err, db){

		if(err) return callback(err);
		db.createCollection('article', {safe: true}, function(err, collection){
			if(err){
				db.close();
				return callback(err);
			}

			collection.insert(obj, {safe: true}, function(err, result){
				db.close();
				if(err) return callback(err);
				callback(null);
			});

		});


	});
}
