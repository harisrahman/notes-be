export const getErrorMsg = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}

	return 'Unknown error.';
};

// Insert space before capital letters. eg - "MySites" => "My Sites"
export const spacedCase = (str: string): string =>
	str.replace(/([A-Z])/g, ' $1').trim();
