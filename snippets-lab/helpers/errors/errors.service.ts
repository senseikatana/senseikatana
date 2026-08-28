// services/ErrorService.ts
export class ErrorService extends Error {
	constructor(
		message: string = "Unknown error",
		public readonly code: number = 400,
	) {
		super(message);
		this.name = "ErrorService";
		Object.setPrototypeOf(this, ErrorService.prototype);
	}

	static badRequest(message = "Bad Request"): ErrorService {
		return new ErrorService(message, 400);
	}

	static unauthorized(message = "Unauthorized"): ErrorService {
		return new ErrorService(message, 401);
	}

	static forbidden(message = "Forbidden"): ErrorService {
		return new ErrorService(message, 403);
	}

	static notFound(message = "Not Found"): ErrorService {
		return new ErrorService(message, 404);
	}

	static internal(message = "Internal Server Error"): ErrorService {
		return new ErrorService(message, 500);
	}

	toJSON() {
		return { name: this.name, message: this.message, code: this.code };
	}
}