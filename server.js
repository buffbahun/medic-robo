const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://admin:VH4$Ws5Wm3yri!R@cluster0.1xor6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("connected to database");
    const db = client.db("darta-records");

    const patientInfo = db.collection("patients");

    app.set("view engine", "ejs");

    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      db.collection("patients")
        .find()
        .toArray()
        .then((result) => {
          res.render("index.ejs", { patient: result });
          //   console.log(result);
        })
        .catch((err) => console.error(err));
      //   res.render("test.ejs", {});
      //   res.sendFile(__dirname + "/index.html");
    });

    app.get("/med", (req, res) => {
      let time = new Date();
      let nw = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      db.collection("patients")
        .find({ time: `${nw}` })
        .toArray()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => console.error(err));
    });

    app.post("/darta", (req, res) => {
      console.log(typeof req.body);
      patientInfo
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.error(err));
    });

    app.delete("/darta", (req, res) => {
      console.log(req.body);
      patientInfo
        .deleteOne({ bedNo: req.body.bedNo })
        .then((result) => {
          res.json("deleted");
        })
        .catch((err) => console.error(err));
    });

    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })
  .catch(console.error);
