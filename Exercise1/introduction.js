var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server("127.0.0.1", mongodb.Connection.DEFAULT_PORT, {}),
    db_connector = new mongodb.Db('test', mongoserver, {});


db_connector.open(function (err, db) {
    if (err) {
        throw err;
    }
    db.collection('users').insert({
        a: 5
    }, function (err, docs) {
        if (err) {
            throw err;
        }
    });

    db.collectionNames(function (err, collections) {
        console.log(collections);
    });

    db.dropCollection('test_insert');

	var collection = new mongodb.Collection(db, 'users');
	collection.find({last_name: 'Prus'}).toArray(function(err, results){
		console.log(results); // output all records
	});

});

db_connector.on("close", function (error) {
    console.log("Connection to the database was closed!");
});