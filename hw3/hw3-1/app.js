var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var students = db.collection('students').find({});

    students.each(function(err, doc){
    	if(err) throw err;
    	if(doc === null) return db.close();
    	var scores = doc.scores;
    	
    	scores.sort(function(a, b){
    		return a.score-b.score;
    	});
    	scores.sort(function(a, b){
    		if(a.type<b.type) return -1;
    		if(a.type>b.type) return 1;
    		return 0;
    	});
    	var index = -1;
    	for(var i = 0; i < scores.length; i++) {
		    if (scores[i].type === 'homework') {
		        index = i;
		        break;
		    }
		}
		scores.splice(index,1);
    	// console.log(scores);

    	
    	db.collection('students').update({_id:doc._id},{$set:{"scores":scores}}, function(err, updated){
    		if(err) throw err;
    		// console.log(updated);
    	});

    });



});
