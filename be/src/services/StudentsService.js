const { Pool } = require("pg");

class StudentsService {
	constructor() {
		this._pool = new Pool();
	}

	async getStudentById(id) {
		const query = {
			text: "SELECT * FROM students WHERE id = $1",
			values: [id],
		};

		const result = await this._pool.query(query);

		return result.rows[0];
	}
}

module.exports = StudentsService;
