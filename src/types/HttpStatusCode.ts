/**
 * 1xx: Informational - Request received, continuing process
 *  104-199	Unassigned
 *
 * 2xx: Success - The action was successfully received, understood, and accepted
 * 209-225 Unassigned
 * 227-299 Unassigned
 *
 * 3xx: Redirection - Further action must be taken in order to complete the request
 * 309-399 Unassigned
 *
 * 4xx: Client Error - The request contains bad syntax or cannot be fulfilled
 * 419 CSRF token error
 * 420 Unassigned
 * 427 Unassigned
 * 430 Unassigned
 * 432-450 Unassigned
 * 452-499 Unassigned
 *
 * 5xx: Server Error - The server failed to fulfill an apparently valid request
 * 509 Unassigned
 * 512-599 Unassigned
 */

enum HttpStatusCode {
	Success = 200,

	BadRequest = 400, // Bad Request
	Unauthorized = 401, // no credentials or invalid credentials
	Forbidden = 403, // valid credentials but not enough privileges
	NotFound = 404,

	ValidationError = 422,

	ServerError = 500,
}

export default HttpStatusCode;
