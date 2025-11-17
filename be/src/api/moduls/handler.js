class ModulsHandler {
	constructor(service) {
		this._service = service;

		this.getModulByIdHandler = this.getModulByIdHandler.bind(this);
	}
	async getModulByIdHandler(request) {
		const { id } = request.params;
		const modul = await this._service.getModulById(id);

		return {
			status: "success",
			data: { modul },
		};
	}
}

module.exports = ModulsHandler;
