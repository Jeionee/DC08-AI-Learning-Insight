const routes = (handler) => [
	{
		method: "GET",
		path: "/moduls",
		handler: handler.getModulsHandler,
	},
];

module.exports = routes;
