const WebRouter = require("../www/WebRouter");

class IndexRoute extends WebRouter {
	constructor() {
		super("/ping", "/controllers/ping");
	}
}

module.exports = new IndexRoute();