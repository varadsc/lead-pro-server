const express = require("express");
const { userAuthMiddleware } = require("../midddlewares/authMiddlewares");
const { userLogin } = require("../controllers/authControllers");
// const {addUser, userLogin} = require('../controllers/userController');
// const { adminAuthMiddleware } = require('../middlewares/adminMiddleware');
const authRouter = express.Router();

authRouter.post("/login", userLogin)
// employeeRouter.get("/createEmployee", Middleware, Controller);


module.exports = {authRouter}