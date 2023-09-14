const dotenv = require("dotenv");
const moduleAlias = require("module-alias");
dotenv.config();
moduleAlias.addAlias("@", __dirname);

const WebServer = require("./www/WebServer");
// const MongoDatabase = require("./database/mongodb");

(async () => {
  WebServer.start();
})();
