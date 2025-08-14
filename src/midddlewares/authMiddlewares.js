const { apiErrorResponse } = require("../utils/commonServices/apiResponseServices");
const { verifyToken } = require("../utils/commonServices/jwtTokenServices");

const userAuthMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
	console.log(req.headers.authorization , 'reqqq')
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return apiErrorResponse(res, "Unauthorized", 401);
	}
	try {
		const token = authHeader.split(' ')[1];
		const decoded = verifyToken(token);
		req.empData = decoded;
		next();
	} catch (err) {
		return apiErrorResponse(res, "Invalid token", 401);
	}
}

const authorizeRoles = (...allowedRoles) => {
	return (req, res, next) => {
		console.log("req employee data", req.empData);
		// if (!req.user || !allowedRoles.includes(req.user.role)) {
		// 	return apiErrorResponse(res, "Forbidden : Access Denied", 403);
		// }
		next();
	};
}


module.exports = {userAuthMiddleware, authorizeRoles};