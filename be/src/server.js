const Hapi = require("@hapi/hapi");
const moduls = require("./api/moduls");

const init = async () => {
	const server = Hapi.server({
		port: 5000,
		host: "localhost",
	});

	server.register({
		plugin: moduls,
		options: {
			service: ModulsService,
		},
	});

	await server.start();
	console.log(`Server is running on ${server.info.uri}`);
};

init();
