/* Error class according to Jsend specification
 * @constructor 
 * @param {string} status: if request succeeded it should be "success", when request succeed but for example given id doesn't exist "fail",
 * otherwise "error"
 * @param {object} data: Acts as the wrapper for any data returned by the API call. 
 * If the call returns no data, data should be set to null.
 * @param {string} message: A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.
 */
class JSendResponse {
	constructor(status, data, message) {
		this.status = status;
		this.data = data;
		this.message = message;
	}
}

module.exports = JSendResponse;
