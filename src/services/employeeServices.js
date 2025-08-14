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

const createEmployeeService = async (employeeData) => {
    const {
        emp_id,
        employee_username,
        employee_password,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        age,
        gender,
        father_full_name,
        mother_name,
        marital_status,
        spouse_name,
        email_id,
        mobile_number,
        education,
        occupation,
        curr_address_line_1,
        curr_address_line_2,
        curr_pin_code,
        curr_state,
        curr_district,
        curr_city,
        curr_locality,
        curr_landmark,
        curr_latitude,
        curr_longitude,
        perm_address_line_1,
        perm_address_line_2,
        perm_pin_code,
        perm_state,
        perm_district,
        perm_city,
        perm_locality,
        perm_landmark,
        perm_latitude,
        perm_longitude,
        bank_name,
        type_of_account,
        ifsc_code,
        bank_account_number,
        confirm_bank_account_number,
        account_holder_name,
        account_branch_name,
        employee_branch_name,
        employee_form_status
    } = employeeData;

    const [result] = await pool.query(
        `INSERT INTO employee (
            emp_id, employee_username, employee_password, first_name, middle_name, last_name,
            date_of_birth, age, gender, father_full_name, mother_name, marital_status, spouse_name,
            email_id, mobile_number, education, occupation, curr_address_line_1, curr_address_line_2,
            curr_pin_code, curr_state, curr_district, curr_city, curr_locality, curr_landmark,
            curr_latitude, curr_longitude, perm_address_line_1, perm_address_line_2, perm_pin_code,
            perm_state, perm_district, perm_city, perm_locality, perm_landmark, perm_latitude,
            perm_longitude, bank_name, type_of_account, ifsc_code, bank_account_number,
            confirm_bank_account_number, account_holder_name, account_branch_name, employee_branch_name,
            employee_form_status
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            emp_id, employee_username, employee_password, first_name, middle_name, last_name,
            date_of_birth, age, gender, father_full_name, mother_name, marital_status, spouse_name,
            email_id, mobile_number, education, occupation, curr_address_line_1, curr_address_line_2,
            curr_pin_code, curr_state, curr_district, curr_city, curr_locality, curr_landmark,
            curr_latitude, curr_longitude, perm_address_line_1, perm_address_line_2, perm_pin_code,
            perm_state, perm_district, perm_city, perm_locality, perm_landmark, perm_latitude,
            perm_longitude, bank_name, type_of_account, ifsc_code, bank_account_number,
            confirm_bank_account_number, account_holder_name, account_branch_name, employee_branch_name,
            employee_form_status
        ]
    );
    return result;
};

const getAllEmployees = async () => {
    const [rows] = await pool.query(`SELECT * FROM employee where mobile_number is NOT NULL`);
    return rows;
};

const getEmployeeById = async (emp_id) => {
    const [rows] = await pool.query(`SELECT * FROM employee WHERE emp_id = ?`, [emp_id]);
    return rows[0];
};

const deleteEmployee = async (emp_id) => {
    const [result] = await pool.query(`DELETE FROM employee WHERE emp_id = ?`, [emp_id]);
    return result;
};

module.exports = {findEmployeeById, findEmployeeByUserName, createEmployeeService, getAllEmployees, getEmployeeById, deleteEmployee}