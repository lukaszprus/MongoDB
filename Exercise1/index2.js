// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("We are connected");
    }
    var collection = db.collection('users');
    var obj = {
        a: 1,
        b: 2
    };

    collection.insert(obj, {
        w: 1
    }, function (err, result) {
        if (err) console.log(err);
    });

    collection.find().toArray(function (err, items) {
        console.log(items);
    });

});