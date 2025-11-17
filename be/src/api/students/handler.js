class StudentsHandler {
	constructor(service) {
		this._service = service;

		this.getStudentByIdHandler = this.getStudentByIdHandler.bind(this);
	}

	async getStudentByIdHandler(request) {
		const { id } = request.params;
		const student = this._service.getStudentById(id);

		return {
			status: "success",
			data: {
				student,
			},
		};
	}
}

module.exports = StudentsHandler;
