const express = require("express");
const { createLead, updatePersonalFormFields, getPersonalFormFields } = require("../controllers/loanLeadsController");
const loanLeadRouter = express.Router();

loanLeadRouter.post("/create-lead", createLead);

loanLeadRouter.post("/add-form-fields", updatePersonalFormFields);

loanLeadRouter.get("/get-form-data", getPersonalFormFields);




module.exports = {loanLeadRouter}