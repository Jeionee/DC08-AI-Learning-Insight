class StudentsHandler {
	constructor(service) {
		this._service = service;

		this.getStudentByIdHandler = this.getStudentByIdHandler.bind(this);
	}

	async getStudentByIdHandler(request, h) {
		const { id } = request.params;
		const student = await this._service.getStudentById(id);
		const response = h.response({
			status: "success",
			data: student,
		});
		response.code(200);
		return response;
	}
}

module.exports = StudentsHandler;
