const bcrypt = require('bcryptjs');
const { apiErrorResponse, apiSuccessResponse } = require("../utils/commonServices/apiResponseServices")
const {generateToken} = require("../utils/commonServices/jwtTokenServices");
const pool = require("../config/db");

const userLogin = async(req, res) => {
	const { emp_id, password } = req.body;
	try {

		const [rows] = await pool.query('SELECT * FROM employee WHERE emp_id = ?', [emp_id]);
		console.log("User details ", rows[0]); 

		if (!rows.length || !rows[0].employee_password) {
			return apiErrorResponse(res, 404, "User not found or password missing");
		}

		const isMatch = await bcrypt.compare(password, rows[0].employee_password);
		if (!isMatch) {
			return apiErrorResponse(res, 404, "Invalid credentials");
		}

		const token = generateToken({ emp_id: emp_id, role: "admin" });
		return apiSuccessResponse(res, 200, "User Logged in ", {token});
	} catch {
		return apiErrorResponse(res, 500, "Internal Server Error");
	}
}

module.exports = {userLogin}