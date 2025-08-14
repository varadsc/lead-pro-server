const routesMap = {
	"/auth": require('./authRoutes')['authRouter'],
	"/employee": require('./employeeRoutes')['employeeRouter'],
	"/branch": require('./branchRoutes')['branchRouter'],
	"/loanLeads": require('./loanLeadsRoutes')['loanLeadRouter'],
};

module.exports = { routesMap };