const express = require("express");
const { userAuthMiddleware, authorizeRoles } = require("../midddlewares/authMiddlewares");
const { createBranch, getBranches, updateBranch, deleteBranch } = require("../controllers/branchController");
const branchRouter = express.Router();

branchRouter.post("/create-branch", userAuthMiddleware, createBranch);

branchRouter.get("/get-branches", userAuthMiddleware, getBranches);

branchRouter.put("/update-branch/:id", userAuthMiddleware, updateBranch);

branchRouter.delete("/delete-branch/:id", userAuthMiddleware, deleteBranch);

module.exports = { branchRouter }