const { Pool } = require("pg");

class ModulsService {
	constructor() {
		this._pool = new Pool();
	}
	async getModulById(id) {
		const query = {
			text: "SELECT * FROM moduls WHERE id = $1",
			values: [id],
		};

		const result = await this._pool.query(query);
		return result.rows[0];
	}
}

module.exports = ModulsService;
