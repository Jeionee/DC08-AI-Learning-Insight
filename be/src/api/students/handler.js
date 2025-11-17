class StudentsHandler {
	constructor(service) {
		this._service = service;

		this.getStudentByIdHandler = this.getStudentByIdHandler.bind(this);
	}

	async getStudentByIdHandler() {}
}

module.exports = StudentsHandler;
