const { findEmployeeById } = require("../../services/employeeServices");
const { apiErrorResponse } = require("./apiResponseServices");

const checkEmployeeExist = async(req, res, employee_id) => {
	const employeeData = await findEmployeeById(employee_id);
	if (!employeeData) {
		apiErrorResponse(res, "User Not found with mentioned data", 404);
	}
	return employeeData;
}

module.exports = {checkEmployeeExist}