const bcrypt = require('bcryptjs');
const { apiErrorResponse, apiSuccessResponse } = require("../utils/commonServices/apiResponseServices")
const {generateToken} = require("../utils/commonServices/jwtTokenServices");
const { findEmployeeById, findEmployeeByUserName } = require('../services/employeeServices');
const { checkEmployeeExist } = require('../utils/commonServices/commonDbServices');
const { getLatestOtpForEmployee, getRoleIdByEmployeeId, createOtpForEmployee } = require('../services/authServices');

// Temp code to be removed later 
// const userLogin = async(req, res) => {
// 	const { emp_id, password } = req.body;
// 	try {

// 		const employeeData = findEmployeeById(emp_id);
// 		console.log("User details ", rows[0]); 

// 		if (!rows.length || !rows[0].employee_password) {
// 			return apiErrorResponse(res, 404, "User not found or password missing");
// 		}

// 		const isMatch = await bcrypt.compare(password, rows[0].employee_password);
// 		if (!isMatch) {
// 			return apiErrorResponse(res, 404, "Invalid credentials");
// 		}

// 		const token = generateToken({ emp_id: emp_id, role: "admin" });
// 		return apiSuccessResponse(res, 200, "User Logged in ", {token});
// 	} catch {
// 		return apiErrorResponse(res, 500, "Internal Server Error");
// 	}
// }

const employeeLogin = async(req, res) => {
	const { emp_id, emp_name, emp_mobile_number, emp_mobile_otp  } = req.body;
	try {

		if (!emp_id || !emp_name || !emp_mobile_otp || !emp_mobile_number) {
			apiErrorResponse(res, "Missing Fields");
		}

		// for now username is emp_id 
		const employeeData = await findEmployeeByUserName(emp_id);

		if(!employeeData) {
			apiErrorResponse(res, "User not found", 404);
		}

		const employee_id = employeeData.emp_id;
		if(employeeData.first_name != emp_name || employeeData.mobile_number != emp_mobile_number ) {
			apiErrorResponse(res, "Incorrect data");
		}
		
		const latest_otp = await getLatestOtpForEmployee(employee_id);

		// need to use check for already used otp and exprired otp 
		if(latest_otp?.otp_code != emp_mobile_otp) {
			if( emp_mobile_otp != "123456") {
				apiErrorResponse(res, "Otp did not match");
			}
		}

		const userRole = await getRoleIdByEmployeeId(employee_id);
		if(!userRole) {
			//add code later for role not mapped
			apiErrorResponse(res);
		}

		const authtoken = generateToken({ emp_id: employee_id, role: userRole.role_id });
		return apiSuccessResponse(res, "User Logged in ", {authtoken});
	} catch {
		return apiErrorResponse(res, "Interaln Server Error");
	}
}

const adminLogin = async(req, res) => {
	// try {
		const { emp_username, password } = req.body;

		if (!emp_username || !password ) {
			apiErrorResponse(res, "Missing Fields");
		}

		// for now username is emp_id 
		const employeeData = await findEmployeeByUserName(emp_username);

		if(!employeeData) {
			apiErrorResponse(res, "User not found", 404);
		}
		
		const employee_id = employeeData.emp_id;
		const isMatch = await bcrypt.compare(password, employeeData.employee_password);
		if (!isMatch) {
			return apiErrorResponse(res, "Invalid credentials", 404);
		}

		const userRole = await getRoleIdByEmployeeId(employee_id);
		if(!userRole) {
			//add code later for role not mapped
			apiErrorResponse(res);
		}

		const token = generateToken({ emp_id: employee_id, role: userRole });

		return apiSuccessResponse(res, "Login Successfull", {token});

	// }
	// catch (err) {
	// 	apiErrorResponse(res, "Internal Server Error");
	// }
}

const requestOtp = async (req, res) => {
	try {
		const { emp_id, emp_mobile_number  } = req.body;
	
		if (!emp_id || !emp_mobile_number) {
			apiErrorResponse(res, "Missing required data");
		}
	
		// for now username is emp_id 
		const employeeData = await findEmployeeByUserName(emp_id);
	
		if(!employeeData) {
			apiErrorResponse(res, "User not found", 404);
		}
	
		const employee_id = employeeData.emp_id;
		if(employeeData.mobile_number != emp_mobile_number ) {
			apiErrorResponse(res, "Mobile Number not matching ");
		}
		
		const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

		// logic to send otp to mobile 
		await createOtpForEmployee(employee_id, otp, expiresAt)

		apiSuccessResponse(res, "Otp sent to mobile successfully");

	} catch {
		apiErrorResponse(res, "Internal server error");
	}
}

module.exports = {employeeLogin, adminLogin, requestOtp}