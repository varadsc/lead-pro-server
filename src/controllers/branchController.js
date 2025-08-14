const { v4: uuidv4 } = require('uuid');
const  { createBranchService, getAllBranches, getBranchById, updateBranchById, deleteBranchById } = require('../services/branchServices');
const { apiSuccessResponse, apiErrorResponse } = require('../utils/commonServices/apiResponseServices');

const createBranch = async (req, res) => {
    try {
        const branch_id = uuidv4();
        const branchData = {
            ...req.body,
            branch_id,
            branch_status: req.body.branch_status || "Active"
        };

        await createBranchService(branchData);
        apiSuccessResponse(res, "Branch created successfully", {}, 201);
    } catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error creating branch");
    }
};

const getBranches = async (req, res) => {
    try {
        const { branch_id } = req.query;

        if (branch_id) {
            const branch = await getBranchById(branch_id);
            if (!branch) {
                return apiErrorResponse(res, "Branch not found", 404);
            }
            return apiSuccessResponse(res, "Branch data fetched", { branch });
        }

        const branches = await getAllBranches();
        apiSuccessResponse(res, "All branches data fetched", { branches });
    } catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error fetching branch data");
    }
};

const updateBranch = async (req, res) => {
    try {
        const result = await updateBranchById(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return apiErrorResponse(res, "Branch not found", 404);
        }
        apiSuccessResponse(res, "Branch data updated successfully");
    } catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error updating branch data");
    }
};

const deleteBranch = async (req, res) => {
    try {
        const result = await deleteBranchById(req.params.id);
        if (result.affectedRows === 0) {
            return apiErrorResponse(res, "Branch not found", 404);
        }
        apiSuccessResponse(res, "Branch deleted successfully");
    } catch (err) {
        console.error(err);
        apiErrorResponse(res, "Error deleting branch");
    }
};

module.exports = {createBranch, getBranches, updateBranch, deleteBranch};