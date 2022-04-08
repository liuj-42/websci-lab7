const express = require("express");
const BodyParser = require("body-parser");
const path = require("path");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const CONNECTION_URL = "mongodb+srv://jam:One23456@cluster0.rup6c.mongodb.net/test";
const DATABASE_NAME = "labs";
const PORT = 3000;

var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

/* This is where the Angular files live after they are built.  */
app.use(express.static(path.join(__dirname, './d3/dist/d3')));

let database, collection;


app.get('/db', (req, res) => {
    collection.find({number:1}).toArray((error, result) => {
        if (error) { return res.status(500).send(error); }
        // console.log(result)
        res.status(200).send(result);
        })
})



app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("lab7");
        console.log(`Listening on http://localhost:${PORT}`);

        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});