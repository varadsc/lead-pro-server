const express = require("express");
const { employeeLogin, adminLogin, requestOtp } = require("../controllers/authControllers");
const authRouter = express.Router();

authRouter.post("/login", employeeLogin);

authRouter.post("/request-otp", requestOtp);

authRouter.post("/admin-login", adminLogin);


module.exports = {authRouter}