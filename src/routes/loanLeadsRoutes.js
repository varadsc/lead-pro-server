const express = require("express");
const { createLead, updatePersonalFormFields, getPersonalFormFields } = require("../controllers/loanLeadsController");
const { userAuthMiddleware, authorizeRoles } = require("../midddlewares/authMiddlewares");
const loanLeadRouter = express.Router();

loanLeadRouter.post("/create-lead", userAuthMiddleware, createLead);

loanLeadRouter.post("/add-form-fields", updatePersonalFormFields);

loanLeadRouter.get("/get-persloan-form-data", getPersonalFormFields);




module.exports = {loanLeadRouter}