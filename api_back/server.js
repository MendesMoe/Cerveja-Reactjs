const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("promise-mysql");
const cors = require("cors");
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
const myModule = require("./testModule");
myModule();

// toutes mes routes
const beerRoutes = require("./routes/beerRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
// connexion BDD
mysql
  .createConnection({
    host: "localhost",
    database: "beer4you",
    user: "root",
    password: "root",
    port: 8889,
  })
  .then((db) => {
    console.log("connecté à la database");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
    }, 10000);

    app.get("/", (req, res, next) => {
      res.json({ status: 200, results: "welcome to api" });
    });
    // toutes les routes sont dans des modules
    beerRoutes(app, db);
    userRoutes(app, db);
    authRoutes(app, db);
    orderRoutes(app, db);
  });

const PORT = 8123;
app.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
