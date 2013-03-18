var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('test', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'test' database");
        db.collection('users', {
            safe: true
        }, function (err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist.");
            }
        });
    }
});

exports.addUser = function (user, callback) {

    console.log('Adding User: ' + JSON.stringify(user));
    db.collection('users').insert(user, function (err, result) {
        callback(err, result);
    });

};

exports.listUsers = function (callback) {
    db.collection('users').find().toArray(function (err, results) {
        callback(err, results); // output all records
    });
};