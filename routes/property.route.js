const WebRouter = require("../www/WebRouter");

class IndexRoute extends WebRouter {
  constructor() {
    super("/property", "/controllers/property");
  }
}

module.exports = new IndexRoute();
