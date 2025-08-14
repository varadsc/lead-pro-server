const express = require("express");
const { createEmployee, getEmployees } = require("../controllers/employeeController");
const { userAuthMiddleware, authorizeRoles } = require("../midddlewares/authMiddlewares");
// const {addUser, userLogin} = require('../controllers/userController');
// const { adminAuthMiddleware } = require('../middlewares/adminMiddleware');
const employeeRouter = express.Router();

employeeRouter.post("/create-employee", userAuthMiddleware, createEmployee);

employeeRouter.get("/get-employees", userAuthMiddleware, getEmployees);


module.exports = {employeeRouter}