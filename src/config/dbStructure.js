const createDBqueries = [`
	CREATE TABLE IF NOT EXISTS employee (
    emp_id VARCHAR(36) PRIMARY KEY,
	employee_username VARCHAR(100),
	employee_password VARCHAR(100),
	first_name VARCHAR(100),
	middle_name VARCHAR(100),
	last_name VARCHAR(100),
	date_of_birth DATE,
	age INT,
	gender VARCHAR(10),
	father_full_name VARCHAR(200),
	mother_name VARCHAR(200),
	marital_status VARCHAR(20),
	spouse_name VARCHAR(200),
	email_id VARCHAR(150),
	mobile_number VARCHAR(15),

	education VARCHAR(100),
	occupation VARCHAR(100),

	curr_address_line_1 VARCHAR(255),
	curr_address_line_2 VARCHAR(255),
	curr_pin_code VARCHAR(10),
	curr_state VARCHAR(100),
	curr_district VARCHAR(100),
	curr_city VARCHAR(100),
	curr_locality VARCHAR(100),
	curr_landmark VARCHAR(100),
	curr_latitude VARCHAR(50),
	curr_longitude VARCHAR(50),

    perm_address_line_1 VARCHAR(255),
    perm_address_line_2 VARCHAR(255),
    perm_pin_code VARCHAR(10),
    perm_state VARCHAR(100),
    perm_district VARCHAR(100),
    perm_city VARCHAR(100),
    perm_locality VARCHAR(100),
    perm_landmark VARCHAR(100),
    perm_latitude VARCHAR(50),
    perm_longitude VARCHAR(50),

    bank_name VARCHAR(100),
    type_of_account VARCHAR(50),
    ifsc_code VARCHAR(20),
    bank_account_number VARCHAR(30),
    confirm_bank_account_number VARCHAR(30),
    account_holder_name VARCHAR(100),
    account_branch_name VARCHAR(100),
    user_active BOOLEAN,
    subscription_active BOOLEAN,
    employee_form_status VARCHAR(30)
)
`,
`CREATE TABLE IF NOT EXISTS roles_master (
    role_id VARCHAR(36) PRIMARY KEY,
    role VARCHAR(100)
);
`,
`

CREATE TABLE IF NOT EXISTS role_user_mapping (
    mapping_id INT PRIMARY KEY, 
    employee_id VARCHAR(36),
    role_id VARCHAR(36),

    CONSTRAINT fk_rum_employee_id FOREIGN KEY (employee_id) REFERENCES employee(emp_id),
    CONSTRAINT fk_rum_role_id FOREIGN KEY (role_id) REFERENCES roles_master(role_id)
); 
`,
`CREATE TABLE IF NOT EXISTS employee_documents_master (
    doc_type_id INT PRIMARY KEY AUTO_INCREMENT,
    document_type VARCHAR(100),
    is_verified BOOLEAN,
    is_required BOOLEAN
);
`,
`CREATE TABLE IF NOT EXISTS employee_docs (
		_id INT PRIMARY KEY AUTO_INCREMENT, 
    employee_id VARCHAR(36), 
    doc_type_id INT,
    document MEDIUMBLOB,                                      -- Max size of file upto 16 gb allowded
    document_verified BOOLEAN,

    -- Foreign Key Constraints
    CONSTRAINT fk_doc_type_id FOREIGN KEY (doc_type_id) REFERENCES employee_documents_master(doc_type_id),
    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employee(emp_id)
);
`,
`CREATE TABLE IF NOT EXISTS loan_leads (
    lead_id VARCHAR(36) PRIMARY KEY,             -- Unique ID for the lead (UUID format)
    lead_loan_type VARCHAR(50),
    lead_status VARCHAR(50),
    lead_creation_date DATE,
    loan_application_date DATE,
    customer_name VARCHAR(150),
    employee_id VARCHAR(36),                     -- FK to employee(emp_id)
    customer_mobile VARCHAR(15),                 -- Allows leading zeros and country codes
    lead_branch_id VARCHAR(50),
    lead_branch_name VARCHAR(100),

    -- Foreign Key Constraint
    CONSTRAINT fk_lead_employee_id FOREIGN KEY (employee_id) REFERENCES employee(emp_id)
);
`,
`CREATE TABLE IF NOT EXISTS loan_application_documents_master (
    doc_type_id INT PRIMARY KEY AUTO_INCREMENT, 
    document_type VARCHAR(100), 
    is_verified BOOLEAN,
    is_required BOOLEAN
);
`,
`CREATE TABLE IF NOT EXISTS loan_application_documents (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,                  -- Auto-incrementing unique document ID
    doc_type_id INT,                                -- FK to loan_application_documents_master(doc_type_id)
    employee_id VARCHAR(36),                                -- FK to employee(emp_id)
    document MEDIUMBLOB,                                    -- Suitable for most documents up to 16MB
    document_verified BOOLEAN,

    -- Foreign Key Constraints
    CONSTRAINT fk_lad_doc_type_id FOREIGN KEY (doc_type_id) REFERENCES loan_application_documents_master(doc_type_id),
    CONSTRAINT fk_lad_employee_id FOREIGN KEY (employee_id) REFERENCES employee(emp_id)
);
`,
`CREATE TABLE IF NOT EXISTS personal_loan_form (
    pers_application_id VARCHAR(36) PRIMARY KEY,                 -- UUID for application
    lead_id VARCHAR(36),                                         -- FK to loan_leads(lead_id)
    form_state VARCHAR(36),
    product_category VARCHAR(100),
    product_name VARCHAR(100),
    application_date DATE,
    applicant_class VARCHAR(50),
    request_loan_amount INT,
    tenure_months INT,
    purpose_of_loan VARCHAR(255),

    -- Applicant details
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    age INT,
    gender VARCHAR(10),
    mobile_number VARCHAR(15),
    email_id VARCHAR(150),
    father_full_name VARCHAR(200),
    marital_status VARCHAR(20),
    spouse_name VARCHAR(200),
    education VARCHAR(100),
    occupation VARCHAR(100),

    -- Current address
    curr_address_line_1 VARCHAR(255),
    curr_address_line_2 VARCHAR(255),
    curr_pin_code VARCHAR(10),
    curr_state VARCHAR(100),
    curr_district VARCHAR(100),
    curr_city VARCHAR(100),
    curr_locality VARCHAR(100),
    curr_landmark VARCHAR(100),
    curr_latitude VARCHAR(50),
    curr_longitude VARCHAR(50),

    -- Permanent address
    perm_address_line_1 VARCHAR(255),
    perm_address_line_2 VARCHAR(255),
    perm_pin_code VARCHAR(10),
    perm_state VARCHAR(100),
    perm_district VARCHAR(100),
    perm_city VARCHAR(100),
    perm_locality VARCHAR(100),
    perm_landmark VARCHAR(100),
    perm_latitude VARCHAR(50),
    perm_longitude VARCHAR(50),

    -- Identification
    pan_card_number VARCHAR(20),
    adhar_card_number VARCHAR(20),

    -- Employment info
    employer_name VARCHAR(150),
    official_email VARCHAR(150),
    working_since DATE,
    net_monthly_salary VARCHAR(20),
    salary_received_mode VARCHAR(50),
    designation VARCHAR(100),
    job_function VARCHAR(100),
    employee_id_number VARCHAR(50),
    uan_number VARCHAR(50),
    epfor_number VARCHAR(50),

    -- Office address
    office_address_line_1 VARCHAR(255),
    office_address_line_2 VARCHAR(255),
    office_pin_code VARCHAR(10),
    office_state VARCHAR(100),
    office_district VARCHAR(100),
    office_city VARCHAR(100),
    office_locality VARCHAR(100),
    office_village VARCHAR(100),
    office_road_landmark VARCHAR(100),
    office_latitude VARCHAR(50),
    office_longitude VARCHAR(50),

    -- Housing
    job_stability VARCHAR(50),
    residential_ownership VARCHAR(50),
    residential_vintage VARCHAR(50),
    residential_zone VARCHAR(50),

    -- Close reference
    close_ref_name VARCHAR(100),
    close_ref_address VARCHAR(255),
    close_ref_contact_number VARCHAR(15),
    close_ref_relationship VARCHAR(100),
    close_ref_occupation VARCHAR(100),
    close_ref_office_name VARCHAR(150),

    -- Professional reference
    professional_ref_name VARCHAR(100),
    professional_ref_address VARCHAR(255),
    professional_ref_contact_number VARCHAR(15),
    professional_ref_relationship VARCHAR(100),
    professional_ref_occupation VARCHAR(100),
    professional_ref_office_name VARCHAR(150),

    -- Applicant bank info
    applicant_bank_name VARCHAR(100),
    applicant_bank_account_name VARCHAR(100),
    bank_statement_file_password VARCHAR(50),

    -- Source person
    lg_code INT,
    lc_code INT,
    name_of_case_source_person VARCHAR(100),

    -- Loan identifiers
    source_person_designation VARCHAR(100),
    source_employee_id_number INT,
    loan_application_number INT,

    -- Beneficiary bank info
    bene_bank_name VARCHAR(100),
    bene_ifsc_code VARCHAR(20),
    bene_bank_account_number VARCHAR(30),
    bene_confirm_bank_account_number VARCHAR(30),
    bene_account_holder_name VARCHAR(100),
    bene_branch_name VARCHAR(100),

    -- Loan plan
    loan_plan VARCHAR(100),
    loan_applied_date DATE,
    sanctioned_amount INT,
    loan_tenure INT,
    loan_interest INT,
    processing_fee INT,
    amount_will_be_credited INT,
    total_emis INT,
    emi_bouncing_charges INT,
    emi_bouncing_gst_18_percent INT,
    late_payment_charges INT,
    late_payment_gst_18_percent INT,
    total_repayment INT,

    -- Lender info
    lender_name VARCHAR(100),
    date_of_submission DATE,
    status VARCHAR(50),
    remark VARCHAR(255),
    lender_branch_name VARCHAR(100),

    -- PD/ENACH/UPI/Signings/Disbursement
    pd_report_status VARCHAR(50),

    initiate_for_enach_registration VARCHAR(10),
    check_status_of_enach_registration VARCHAR(10),
    reinitiate_for_enach_registration VARCHAR(10),
    enach_registration_final_status VARCHAR(50),
    date_of_enach_registration VARCHAR(20),

    initiate_for_upi_auto VARCHAR(10),
    upi_auto_pay_registration_final_status VARCHAR(50),
    date_of_upi_auto_pay_registration DATE,

    saction_letter_esign_document VARCHAR(255),
    loan_agreement_esign_document VARCHAR(255),
    check_status_of_signing_documents VARCHAR(10),
    reinitiate_for_signing_documents VARCHAR(10),
    documents_signing_final_status VARCHAR(50),
    date_of_documents_signing DATE,

    initiate_for_loan_disbursement VARCHAR(10),
    check_status_of_loan_disbursement VARCHAR(10),
    reinitiate_loan_disbursement VARCHAR(10),
    ursement VARCHAR(10),
    cancel_the_hold_the_loan_disbloan_disbursement VARCHAR(10),
    loan_disbursement_final_status VARCHAR(50),
    date_of_loan_disbursement DATE,

    -- Foreign Key Constraint
    CONSTRAINT fk_plf_lead_id FOREIGN KEY (lead_id) REFERENCES loan_leads(lead_id)
);
`,
`CREATE TABLE IF NOT EXISTS branches_master (
    branch_id VARCHAR(36) PRIMARY KEY,         -- UUID for unique branch ID
    branch_name VARCHAR(100),
    branch_address VARCHAR(255),
    branch_city VARCHAR(100),
    branch_manager VARCHAR(100),
    branch_mobile_no VARCHAR(15),              -- Changed to VARCHAR to support country codes and leading zeros
    branch_status VARCHAR(20)                  -- e.g., Active, Inactive
);
`
]


module.exports = createDBqueries;