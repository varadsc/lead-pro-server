const apiErrorResponse = (res, apiStatus=500, message = "Internal Server Error", codeError="") => {
	return res.status(apiStatus).json({message: message, success:false, codeError:codeError});
};

const apiSuccessResponse = (res, apiStatus=200, message = "", data = {}) => {
	return res.status(apiStatus).json({message: message, success:true, result: data});
};

module.exports = {apiErrorResponse, apiSuccessResponse};