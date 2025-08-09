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
    employee_branch_name VARCHAR(100),
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
    employee_id VARCHAR(36),                     -- FK to employee(emp_id)
    customer_mobile VARCHAR(15),                 -- Allows leading zeros and country codes
    lead_branch_id VARCHAR(50),

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
    intrest_rate INT,
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

    form_completion_phase VARCHAR(50),

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
`,
`CREATE TABLE IF NOT EXISTS otps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(36),
    otp_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_otp_employee_id FOREIGN KEY (employee_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);
`
]

const dummyDataQueries = [
    `INSERT IGNORE INTO employee (
    emp_id, employee_username, employee_password,
    first_name, middle_name, last_name, date_of_birth, age, gender,
    father_full_name, mother_name, marital_status, spouse_name,
    email_id, mobile_number, education, occupation,
    curr_address_line_1, curr_address_line_2, curr_pin_code, curr_state, curr_district,
    curr_city, curr_locality, curr_landmark, curr_latitude, curr_longitude,
    perm_address_line_1, perm_address_line_2, perm_pin_code, perm_state, perm_district,
    perm_city, perm_locality, perm_landmark, perm_latitude, perm_longitude,
    bank_name, type_of_account, ifsc_code, bank_account_number, confirm_bank_account_number,
    account_holder_name, account_branch_name, employee_branch_name, user_active, subscription_active, employee_form_status
    )
    VALUES
    -- Row 1
    ('1a2b3c4d-1111-aaaa-bbbb-cccc12345678', 'john.doe', 'securePass123',
    'John', 'Michael', 'Doe', '1990-05-10', 34, 'Male',
    'Robert Doe', 'Maria Doe', 'Married', 'Anna Doe',
    'john.doe@example.com', '9876543210', 'B.Tech', 'Software Engineer',
    '123 Main Street', 'Apt 4B', '411001', 'Maharashtra', 'Pune',
    'Pune', 'Kothrud', 'Near Bus Stop', '18.5204', '73.8567',
    '456 Other Street', 'House No. 78', '400001', 'Maharashtra', 'Mumbai',
    'Mumbai', 'Andheri', 'Opp Metro', '19.0760', '72.8777',
    'HDFC Bank', 'Savings', 'HDFC0000123', '123456789012', '123456789012',
    'John M Doe', 'Kothrud Branch', 'b1a2c3d4-e5f6-7890-ab12-34567890abcd', TRUE, TRUE, 'Submitted'),

    -- Row 2
    ('2b3c4d5e-2222-bbbb-cccc-dddd23456789', 'jane.smith', 'pass456!',
    'Jane', 'A.', 'Smith', '1995-08-15', 29, 'Female',
    'George Smith', 'Lucy Smith', 'Single', '',
    'jane.smith@example.com', '8765432109', 'MBA', 'HR Manager',
    '789 South Avenue', 'Flat No. 12', '500081', 'Telangana', 'Hyderabad',
    'Hyderabad', 'Banjara Hills', 'Near Park', '17.3850', '78.4867',
    '321 North Street', '', '110001', 'Delhi', 'New Delhi',
    'New Delhi', 'CP', '', '28.6139', '77.2090',
    'ICICI Bank', 'Current', 'ICIC0000456', '987654321098', '987654321098',
    'Jane A Smith', 'Banjara Branch', 'b1a2c3d4-e5f6-7890-ab12-34567890abcd', TRUE, FALSE, 'Pending'),
    
    ('3c4d5e6f-3333-cccc-dddd-eeee34567890', 'rahul.verma', 'rahul123!',
    'Rahul', '', 'Verma', '1992-12-01', 31, 'Male',
    'Suresh Verma', 'Nina Verma', 'Married', 'Pooja Verma',
    'rahul.verma@example.com', '9123456780', 'MCA', 'Project Manager',
    '12 MG Road', '', '560001', 'Karnataka', 'Bangalore',
    'Bangalore', 'Indiranagar', 'Near Mall', '12.9716', '77.5946',
    '78 Brigade Road', '', '110075', 'Delhi', 'New Delhi',
    'New Delhi', 'Dwarka', '', '28.5355', '77.3910',
    'SBI', 'Savings', 'SBIN0000678', '112233445566', '112233445566',
    'Rahul Verma', 'Indiranagar Branch', 'b2b3c4d5-e6f7-8910-bc23-45678901bcde', TRUE, TRUE, 'Approved');
    `,

    `INSERT IGNORE  INTO roles_master (role_id, role)
    VALUES
    ('role-001', 'Admin'),
    ('role-002', 'Employee'),
    ('role-003', 'Manager');
    `,
    `
    INSERT IGNORE  INTO role_user_mapping (mapping_id, employee_id, role_id)
    VALUES
    (1, '1a2b3c4d-1111-aaaa-bbbb-cccc12345678', 'role-002'),  -- John → Admin
    (2, '2b3c4d5e-2222-bbbb-cccc-dddd23456789', 'role-002'),  -- Jane → Employee
    (3, '3c4d5e6f-3333-cccc-dddd-eeee34567890', 'role-003');  -- Rahul → Manager
    `,
    `
    INSERT IGNORE  INTO employee_documents_master (document_type, is_verified, is_required)
    VALUES
    ('Aadhar Card', FALSE, TRUE),
    ('PAN Card', FALSE, TRUE),
    ('Passport', FALSE, FALSE);
    `,
    `
    INSERT IGNORE  INTO employee_docs (employee_id, doc_type_id, document, document_verified)
    VALUES
    ('1a2b3c4d-1111-aaaa-bbbb-cccc12345678', 1, x'255044462D312E', TRUE),   -- John → Aadhar
    ('2b3c4d5e-2222-bbbb-cccc-dddd23456789', 2, x'89504E470D0A1A0A', FALSE), -- Jane → PAN
    ('3c4d5e6f-3333-cccc-dddd-eeee34567890', 3, x'504B0304', FALSE);         -- Rahul → Passport
    `,
    `INSERT IGNORE  INTO loan_leads (
    lead_id, lead_loan_type, lead_status,
    lead_creation_date, loan_application_date,
    employee_id,
    customer_mobile, lead_branch_id
    )
    VALUES
    (
    'lead-001', 'Home Loan', 'Pending',
    '2025-07-01', '2025-07-05',
    '1a2b3c4d-1111-aaaa-bbbb-cccc12345678',
    '9876543210', 'BR001'
    ),
    (
    'lead-002', 'Car Loan', 'Approved',
    '2025-07-10', '2025-07-15',
    '2b3c4d5e-2222-bbbb-cccc-dddd23456789',
    '9123456789', 'BR002'
    );
    `,
    `INSERT IGNORE  INTO loan_application_documents_master (document_type, is_verified, is_required)
    VALUES
    ('Income Proof', FALSE, TRUE),
    ('Address Proof', FALSE, TRUE),
    ('ID Proof', FALSE, TRUE);
    `,
    `INSERT IGNORE  INTO loan_application_documents (doc_type_id, employee_id, document, document_verified)
    VALUES
    (1, '1a2b3c4d-1111-aaaa-bbbb-cccc12345678', x'255044462D312E', TRUE),   -- Income Proof for John
    (2, '2b3c4d5e-2222-bbbb-cccc-dddd23456789', x'89504E470D0A1A0A', FALSE), -- Address Proof for Jane
    (3, '3c4d5e6f-3333-cccc-dddd-eeee34567890', x'504B0304', FALSE);         -- ID Proof for Rahul
    `,
    `INSERT IGNORE  INTO personal_loan_form (
    pers_application_id, lead_id, form_state, product_category, product_name, application_date,
    applicant_class, request_loan_amount, tenure_months, intrest_rate, purpose_of_loan,
    
    first_name, middle_name, last_name, date_of_birth, age, gender,
    mobile_number, email_id, father_full_name, marital_status, education, occupation,
    
    pan_card_number, adhar_card_number,
    employer_name, official_email, working_since, net_monthly_salary, salary_received_mode,
    designation, job_function, employee_id_number,
    
    applicant_bank_name, applicant_bank_account_name,
    
    lg_code, lc_code, name_of_case_source_person,
    source_person_designation, source_employee_id_number, loan_application_number,
    
    bene_bank_name, bene_ifsc_code, bene_bank_account_number, bene_confirm_bank_account_number,
    bene_account_holder_name, bene_branch_name,
    
    loan_plan, loan_applied_date, sanctioned_amount, loan_tenure, loan_interest, processing_fee,
    amount_will_be_credited, total_emis, emi_bouncing_charges, emi_bouncing_gst_18_percent,
    late_payment_charges, late_payment_gst_18_percent, total_repayment,
    
    lender_name, date_of_submission, status, remark, lender_branch_name, form_completion_phase
    )
    VALUES
    -- Row 1
    (
    'plf-001', 'lead-001', 'draft', 'Personal Loan', 'Flexi Loan', '2025-07-26',
    'Salaried', 500000, 36, 12, 'Home Renovation',
    
    'Amit', 'Kumar', 'Sharma', '1990-04-15', 35, 'Male',
    '9876543210', 'amit.sharma@example.com', 'Ramesh Sharma', 'Married', 'Graduate', 'Engineer',
    
    'ABCDE1234F', '123456789012',
    'ABC Tech Ltd', 'amit.sharma@abctech.com', '2018-06-01', '60000', 'Bank Transfer',
    'Senior Engineer', 'IT', 'EMP123456',
    
    'HDFC Bank', 'Amit Sharma',
    
    1001, 2001, 'Vikas Deshmukh',
    'Sales Officer', 9001, 4001,
    
    'HDFC Bank', 'HDFC0001234', '123456789012', '123456789012',
    'Amit Sharma', 'Kothrud Branch',
    
    'Standard Plan', '2025-07-26', 490000, 36, 12, 5000,
    485000, 36, 350, 63,
    500, 90, 550000,
    
    'ABC Finance Ltd', '2025-07-26', 'Submitted', 'Initial stage', 'Kothrud', 'phase_0'
    ),

    -- Row 2
    (
    'plf-002', 'lead-002', 'draft', 'Personal Loan', 'Medical Loan', '2025-07-26',
    'Self-Employed', 300000, 24, 10, 'Medical Emergency',
    
    'Priya', '', 'Desai', '1992-08-10', 32, 'Female',
    '9123456789', 'priya.desai@example.com', 'Nilesh Desai', 'Single', 'MBA', 'Consultant',
    
    'XYZPD5678K', '987654321098',
    'Desai Consulting', 'priya@desaiconsult.com', '2019-03-01', '85000', 'UPI',
    'Consultant', 'Finance', 'EMP654321',
    
    'ICICI Bank', 'Priya Desai',
    
    1002, 2002, 'Megha Kulkarni',
    'Relationship Manager', 9002, 4002,
    
    'ICICI Bank', 'ICIC0000456', '987654321012', '987654321012',
    'Priya Desai', 'Banjara Hills Branch',
    
    'Quick Approval Plan', '2025-07-26', 295000, 24, 10, 4000,
    291000, 24, 250, 45,
    400, 72, 320000,
    
    'XYZ Finance Pvt Ltd', '2025-07-26', 'In Review', 'Documents pending', 'Banjara Hills', 'phase_0'
    );
    `,
    `INSERT IGNORE  INTO branches_master (
    branch_id, branch_name, branch_address, branch_city,
    branch_manager, branch_mobile_no, branch_status
    ) VALUES 
    (
        'b1a2c3d4-e5f6-7890-ab12-34567890abcd', 
        'Pune Central Branch', 
        '123 FC Road, Shivaji Nagar', 
        'Pune', 
        'Rajesh Sharma', 
        '+919812345678', 
        'Active'
    ),
    (
        'b2b3c4d5-e6f7-8910-bc23-45678901bcde', 
        'Mumbai West Branch', 
        '456 Linking Road, Bandra', 
        'Mumbai', 
        'Sneha Desai', 
        '+919876543210', 
        'Active'
    ),
    (
        'c3c4d5e6-f7g8-9101-cd34-56789012cdef', 
        'Nagpur Branch', 
        '789 Sitabuldi Road', 
        'Nagpur', 
        'Amit Joshi', 
        '+918888555111', 
        'Inactive'
    );
`,
    `INSERT IGNORE INTO otps (id, employee_id, otp_code, expires_at, used, created_at)
    VALUES
    (1, '1a2b3c4d-1111-aaaa-bbbb-cccc12345678', '123456', '2025-08-02 14:00:00', FALSE, '2025-08-02 13:00:00'),
    (2, '1a2b3c4d-1111-aaaa-bbbb-cccc12345678', '654321', '2025-08-02 14:05:00', FALSE, '2025-08-02 13:00:00');
  `
,
`
    INSERT IGNORE INTO employee
    (emp_id, employee_username, employee_password, first_name, middle_name, last_name, date_of_birth, age, gender, father_full_name, mother_name, marital_status, spouse_name, email_id, mobile_number, education, occupation, curr_address_line_1, curr_address_line_2, curr_pin_code, curr_state, curr_district, curr_city, curr_locality, curr_landmark, curr_latitude, curr_longitude, perm_address_line_1, perm_address_line_2, perm_pin_code, perm_state, perm_district, perm_city, perm_locality, perm_landmark, perm_latitude, perm_longitude, bank_name, type_of_account, ifsc_code, bank_account_number, confirm_bank_account_number, account_holder_name, account_branch_name, user_active, subscription_active, employee_form_status, employee_branch_name)
    VALUES('2cea0b49-3bdc-413d-bead-7771dcb170fd', 'admin_01', '$2a$12$mcdulyHUn6xAQ.ylKo9tTeQSML5vfy.N292w5rSOzfkL0q3ZsDEIy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'b2b3c4d5-e6f7-8910-bc23-45678901bcde');
`,
`
    INSERT IGNORE INTO role_user_mapping
    (mapping_id, employee_id, role_id)
    VALUES(4, '2cea0b49-3bdc-413d-bead-7771dcb170fd', 'role-001');
`
]

module.exports = {createDBqueries, dummyDataQueries};

