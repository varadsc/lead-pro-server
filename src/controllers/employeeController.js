const { v4: uuidv4 } = require('uuid');
const { apiErrorResponse, apiSuccessResponse } = require("../utils/commonServices/apiResponseServices");
const { createEmployeeService, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require('../services/employeeServices');

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
    try {

        const {emp_id} = req.query;
        if(emp_id) {
            const employee = await getEmployeeById(emp_id);
            if(!employee) {
                apiErrorResponse(res, "Employee data not found", 404);
            }
            apiSuccessResponse(res, "Employee data fetched", {employee})
        }
        else {
            const employees = await getAllEmployees();
            apiSuccessResponse(res, "All employees data fetched", {employees})
        }
    } catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error Fetching employee data");
    }
};

const updateEmployee = async (req, res) => {
    // try {
        const result = await updateEmployeeById(req.params.id, req.body);
        if (result.affectedRows === 0) {
            apiErrorResponse(res, "Employee not found", 404);
        }
        apiSuccessResponse(res, "Employee data updated successfully");
    // }
    // catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error Updating employee data");
    // }

}


const deleteEmployee = async (req, res) => {
    try {
        const result = await deleteEmployeeById(req.params.id);
        if (result.affectedRows === 0) {
            apiErrorResponse(res, "Employee not found");
        }
        apiSuccessResponse(res, "Employee deleted successfully");
    }
    catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error deleting employee");
    }
}


module.exports = {createEmployee, getEmployees, deleteEmployee, updateEmployee}