const routesMap = {
	"/auth": require('./authRoutes')['authRouter'],
	"/employee": require('./employeeRoutes')['employeeRouter'],
	"/loanLeads": require('./loanLeadsRoutes')['loanLeadRouter'],
};

module.exports = { routesMap };