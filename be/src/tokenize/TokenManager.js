const Jwt = require("@hapi/jwt");
const InvariantError = require("../../exceptions/InvariantError");

const TokenManager = {
	generateAccessToken: (payload) => Jwt.toke.generate(payload, process.env.ACCESS_TOKEN_KEY),
	generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
	verifyRefreshToken: (refreshToken) => {
		try {
			const artifacts = Jwt.token.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
			return artifacts.decoded.payload;
		} catch (err) {
			return new InvariantError("refresh token tidak valid");
		}
	},
};

module.exports = TokenManager;
