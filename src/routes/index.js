const routesMap = {
	"/auth": require('./authRoutes')['authRouter'],
	"/employee": require('./employeeRoutes')['employeeRouter'],
};

module.exports = { routesMap };