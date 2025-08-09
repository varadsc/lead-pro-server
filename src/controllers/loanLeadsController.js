const { createLoanLead, createPersonalLoanForm, updatePersonalLoanFormById, getPersonalLoanFormData } = require("../services/loanLeadsServices");
const { apiErrorResponse, apiSuccessResponse } = require("../utils/commonServices/apiResponseServices")

const createLead = async(req, res) => {
	const {lead_type} = req.body;

	if(!(lead_type == "personal_loan" || lead_type == "std_loan")) {
		apiErrorResponse(res, "Invalid lead Type")
	}

	const employee_id = "1a2b3c4d-1111-aaaa-bbbb-cccc12345678";
	const branch_id = "b1a2c3d4-e5f6-7890-ab12-34567890abcd";

	const leadID = await createLoanLead(lead_type, employee_id, branch_id);

	if(!leadID) apiErrorResponse(res, "Could not create lead, please try again");

	const formId = await createPersonalLoanForm(leadID);
	if(!formId) apiErrorResponse(res, "Could not create lead, please try again")

	apiSuccessResponse(res, "Lead Created with data ", {lead_id : leadID, form_id: formId});
}

const updatePersonalFormFields = async(req, res) => {
	const {form_id, fieldsToUpdate, saveState, completion_phase} = req.body;

	await updatePersonalLoanFormById(form_id, fieldsToUpdate, saveState, completion_phase);

	apiSuccessResponse(res, "Fields updated successfully ");
}

const getPersonalFormFields = async(req, res) => {
	const {formId} = req.query;

	if(!formId) apiErrorResponse(res, "Form id required");

	const formData = getPersonalLoanFormData(formId);

	if(!formData) apiErrorResponse(res, "Could not get form data");

	

}


module.exports = {createLead, updatePersonalFormFields, getPersonalFormFields};