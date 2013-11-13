var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

    var cursor = data.find();
    // cursor.skip(1);
    // cursor.limit(4);
    cursor.sort([['State', 1],['Temperature',-1]]);
    //cursor.sort([['grade', 1], ['student', -1]]);

    //var options = { 'skip' : 1,
    //                'limit' : 4,
    //                'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);
    var previousState = null;
    // var update_ids = [];
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        if(doc.State !== previousState){
            previousState = doc.State;
            // update_ids.push(doc._id);
            // console.log(update_ids);
            db.collection('data').update({"_id":doc._id},{"$set" : {"month_high":true}}, {"safe":true},function(err, updated){
            if(err) throw err;
            console.log("Documents updated: " + updated);
        });
            
        }
    });
    // data.update({"_id" : {"$in" : update_ids}},{"$set" : {"month_high":true}},{"multi":true},function(err, updated){
    //     if(err) throw err;
    //     console.log("Documents updated: " + updated);
    // });
});
