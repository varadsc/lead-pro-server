const { v4: uuidv4 } = require('uuid');
const { apiErrorResponse, apiSuccessResponse } = require("../utils/commonServices/apiResponseServices");
const { createEmployeeService, getAllEmployees } = require('../services/employeeServices');

const createEmployee = async (req, res) => {
	try {
        const emp_id = uuidv4();
        const employeeData = {
            ...req.body,
            emp_id,
            employee_form_status: 'draft'
        };

        await createEmployeeService(employeeData);
		apiSuccessResponse(res, "Employee Created Successfully", {}, 201);
    } catch (err) {
		apiErrorResponse(res, "Error Adding employee");
    }

}

const getEmployees = async (req, res) => {
    // try {
        const employees = await getAllEmployees();
		apiSuccessResponse(res, "All employees data fetched", {employees})
        res.json(employees);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Error fetching employees' });
    // }
};


module.exports = {createEmployee, getEmployees}