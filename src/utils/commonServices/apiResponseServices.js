const apiErrorResponse = (res, message = "Internal Server Error", apiStatus=500, codeError="") => {
	return res.status(apiStatus).json({message: message, success:false, codeError:codeError});
};

const apiSuccessResponse = (res, message = "", data = {}, apiStatus=200) => {
	return res.status(apiStatus).json({message: message, success:true, result: data});
};

module.exports = {apiErrorResponse, apiSuccessResponse};