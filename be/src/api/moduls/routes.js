const routes = (handler) => [
	{
		method: "GET",
		path: "/moduls/{id}",
		handler: handler.getModulByIdHandler,
	},
];

module.exports = routes;
