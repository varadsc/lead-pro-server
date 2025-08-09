const pool = require("../config/db");
const { v4: uuidv4 } = require('uuid');

const createLoanLead = async (lead_loan_type, employee_id, lead_branch_id) => {
    const lead_id = uuidv4();
    const lead_status = 'Pending';
    const lead_creation_date = new Date();

    await pool.query(
        `INSERT INTO loan_leads 
        (lead_id, lead_loan_type, lead_status, lead_creation_date, employee_id, lead_branch_id, loan_application_date, customer_mobile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            lead_id,
            lead_loan_type,
           	lead_status,
            lead_creation_date,
            employee_id,
            lead_branch_id,
            null,
            ''
        ]
    );

    return lead_id ;
};

const createPersonalLoanForm = async (lead_id) => {
    const pers_application_id = uuidv4();

    await pool.query(
        `INSERT INTO personal_loan_form (pers_application_id, lead_id, form_state)
         VALUES (?, ?, ";")`,
        [pers_application_id, lead_id]
    );

    return pers_application_id;
};

const updatePersonalLoanFormById = async (pers_application_id, fieldsToUpdate, saveState="draft", completion_phase) => {
    const keys = Object.keys(fieldsToUpdate);

    if (keys.length === 0) {
        throw new Error("No fields to update");
    }

    const setClause = keys.map((key, index) => `${key} = ?`).join(', ');
    const values = keys.map(key => fieldsToUpdate[key]);

    const query = `
        UPDATE personal_loan_form
        SET ${setClause}
        WHERE pers_application_id = ?
    `;

    
    await pool.query(query, [...values, pers_application_id]);

    if ( completion_phase != "" ) {
        const completion_query = `
        UPDATE personal_loan_form
        SET form_completion_phase = ?
        WHERE pers_application_id = ?
    `;

    await pool.query(completion_query, [completion_phase, pers_application_id]);
    }

    if ( saveState != "draft" && saveState != "" ) {
        const completion_query = `
        UPDATE personal_loan_form
        SET form_state = ?
        WHERE pers_application_id = ?
    `;

    await pool.query(completion_query, [saveState, pers_application_id]);
    }
};

const getPersonalLoanFormData = async (pers_form_id) => {
    const [rows] = await pool.query(
        `SELECT * FROM personal_loan_form WHERE pers_application_id = ?`,
        [pers_form_id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};



module.exports = {createLoanLead, createPersonalLoanForm, updatePersonalLoanFormById, getPersonalLoanFormData};