const routes = (handler) => [
	{
		method: "GET",
		path: "/students/{id}",
		handler: handler.getStudentByIdHandler,
	},
];

module.exports = routes;
