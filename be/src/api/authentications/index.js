const routes = require("../moduls/routes");
const authenticationsHandler = require("./handler");

module.export = {
	name: "authentications",
	version: "1.0.0",
	register: async (server, { authenticationsService, usersService, tokenManager }) => {
		const authenticationsHandler = new AuthenticationsHandler(
			authenticationsService,
			usersService,
			tokenManager
		);
		server.route(routes(authenticationsHandler));
	},
};
