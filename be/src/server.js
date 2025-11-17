const Hapi = require("@hapi/hapi");
const moduls = require("./api/moduls");
const ModulsService = require("./services/ModulsService");
const StudentsService = require("./services/")

const init = async () => {
	const modulsService = new ModulsService();
	const studentsService = new StudentsService();

	const server = Hapi.server({
		port: 5000,
		host: "localhost",
	});

	server.register({
		plugin: moduls,
		options: {
			service: modulsService,
		},
	});
	server.register({
		plugin: students,
		options: {
			service: studentsService,
		},
	});

	await server.start();
	console.log(`Server is running on ${server.info.uri}`);
};

init();
