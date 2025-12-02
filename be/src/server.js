require("dotenv").config();
const Hapi = require("@hapi/hapi");

/* plugin */
const moduls = require("./api/moduls");
const students = require("./api/students");

/* services */
const ModulsService = require("./services/ModulsService");
const StudentsService = require("./services/StudentsService");

const init = async () => {
	const modulsService = new ModulsService();
	const studentsService = new StudentsService();

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	await server.register([
		{
			plugin: moduls,
			options: {
				service: modulsService,
			},
		},
		{
			plugin: students,
			options: {
				service: studentsService,
			},
		},
	]);

	await server.start();
	console.log(`Server is running on ${server.info.uri}`);
};

init();
