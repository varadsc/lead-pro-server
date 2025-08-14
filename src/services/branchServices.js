const pool = require("../config/db");

const createBranchService = async (branchData) => {
    const { branch_id, branch_name, branch_address, branch_city, branch_manager, branch_mobile_no, branch_status } = branchData;

    await pool.query(
        `INSERT INTO branches_master 
        (branch_id, branch_name, branch_address, branch_city, branch_manager, branch_mobile_no, branch_status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [branch_id, branch_name, branch_address, branch_city, branch_manager, branch_mobile_no, branch_status]
    );
};

const getAllBranches = async () => {
    const [rows] = await pool.query("SELECT * FROM branches_master");
    return rows;
};

const getBranchById = async (branch_id) => {
    const [rows] = await pool.query("SELECT * FROM branches_master WHERE branch_id = ?", [branch_id]);
    return rows[0];
};

const updateBranchById = async (branch_id, branchData) => {
    const [result] = await pool.query(
        "UPDATE branches_master SET ? WHERE branch_id = ?",
        [branchData, branch_id]
    );
    return result;
};

const deleteBranchById = async (branch_id) => {
    const [result] = await pool.query(
        "DELETE FROM branches_master WHERE branch_id = ?",
        [branch_id]
    );
    return result;
};

module.exports = {createBranchService, getAllBranches, getBranchById, deleteBranchById, updateBranchById };