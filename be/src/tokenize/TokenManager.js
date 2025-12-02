const Jwt = require("@hapi/jwt");
const invariantError = require("../../exceptions/InvariantError");

const TokenManager = {
	generateAccessToken: (payload) => {},
	generateRefreshToken: (payload) => {},
	verifyRefreshToken: (refreshToken) => {},
};

module.exports = TokenManager;
