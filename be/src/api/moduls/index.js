const ModulsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
	name: "albums",
	version: "1.0.0",
	register: async (server, { service, validator }) => {
		const modulsHandler = new ModulsHandler(service, validator);
		server.route(routes(modulsHandler));
	},
};
