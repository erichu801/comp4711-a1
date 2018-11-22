const express = require('express');
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
const app = express();

let port = process.env.PORT || 8080;

/*
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder from the client-side
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

var server = app.listen(port, () => {
  console.info('listening on %d', server.address().port);
});



