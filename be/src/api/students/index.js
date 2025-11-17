const routes = require("./routes");
const StudentsHandler = require("./handler");

module.exports = {
	name: "students",
	version: "1.0.0",
	register: async (server, { service }) => {
		const studentsHandler = new StudentsHandler(service);
		server.route(routes(studentsHandler));
	},
};
