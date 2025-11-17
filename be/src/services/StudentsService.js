const { Pool } = require("pg");

class StudentsService {
	constructor() {
		this._pool = new Pool();
	}
}

module.exports = StudentsService;
e