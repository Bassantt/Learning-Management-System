/*const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = 'MyData';
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });


client.connect(function (err) {

    const db = client.db(dbName);
    const data1 = fs.readFileSync('./data/out_file_users.json');
    const docs1 = JSON.parse(data1.toString());


    db.collection('users')
        .insertMany(docs1, function (err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            client.close();
        });
    const data2 = fs.readFileSync('./data/out_file_courses.json');
    const docs2 = JSON.parse(data2.toString());

    db.collection('courses')
        .insertMany(docs2, function (err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            client.close();
        });

    const data3 = fs.readFileSync('./data/out_file_questions.json');
    const docs3 = JSON.parse(data3.toString());

    db.collection('questions')
        .insertMany(docs3, function (err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            client.close();
        });

});

*/


var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/uiui"; //host and db
var file = require('./data/out_file_users.json');

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    var dbo = db.db("uiui"); //db
    file.map(elem => {
        elem._id = ObjectID(elem._id)
        dbo.collection("users").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});

var file2 = require('./data/out_file_courses.json');
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    var dbo = db.db("uiui"); //db
    file2.map(elem => {
        elem._id = ObjectID(elem._id)
        dbo.collection("courses").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});

var file3 = require('./data/out_file_questions.json');
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    var dbo = db.db("uiui"); //db
    file3.map(elem => {
        elem._id = ObjectID(elem._id)
        dbo.collection("questions").insertOne(elem, function (err, res) { //collection
            if (err) throw err;
        });
    })
    console.log("done")

});