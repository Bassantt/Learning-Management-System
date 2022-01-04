var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/LearningSystem"; //host and db
var file = require('./data/out_file_users.json');

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    var dbo = db.db("LearningSystem"); //db
    await file.map(elem => {
        elem._id = ObjectID(elem._id)
        dbo.collection("users").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});

var file2 = require('./data/out_file_courses.json');
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    var dbo = db.db("LearningSystem"); //db
    await file2.map(elem => {
        elem._id = ObjectID(elem._id)
        elem.instructor = ObjectID(elem.instructor)
        dbo.collection("courses").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});

var file3 = require('./data/out_file_questions.json');
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    var dbo = db.db("LearningSystem"); //db
    await file3.map(elem => {
        elem._id = ObjectID(elem._id)
        dbo.collection("questions").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});