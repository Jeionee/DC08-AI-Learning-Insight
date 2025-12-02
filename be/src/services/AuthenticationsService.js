const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

class AuthenticationsService {
	constructor() {
		this._pool = new Pool();
	}
	async addRefreshToken(token) {}
	async verifyRefreshToken(token) {}
	async deleteRefreshToken(token) {}
}

module.exports = AuthenticationsService;
