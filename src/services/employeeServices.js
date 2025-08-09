const pool = require("../config/db");

const findEmployeeById = async(employee_id) => {
	const [rows] = await pool.query('SELECT * FROM employee WHERE emp_id = ?', [employee_id]);
	return rows[0];
};

// for now user name is employee id given to employee 
const findEmployeeByUserName = async(employee_user_name) => {
	const [rows] = await pool.query('SELECT * FROM employee WHERE employee_username = ?', [employee_user_name]);
	return rows[0];
};


module.exports = {findEmployeeById, findEmployeeByUserName}