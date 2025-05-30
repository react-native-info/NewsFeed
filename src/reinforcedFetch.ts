const MAX_RETRIES = 5;
const BASE_DELAY = 1000;

const reinforcedFetch = async (...args: Parameters<typeof fetch>) => {
    let lastError: any = null;
    let lastServerErrorResponse: Response | null = null;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(...args);
            if (response.status >= 500 && response.status < 600) {
                lastServerErrorResponse = response;
                throw new Error(`Server error: ${response.status}`);
            }
            return response;
        } catch (err) {
            lastError = err;
            const isRetryable = err instanceof TypeError || (err instanceof Error && err.message.startsWith("Server error"));
            if (!isRetryable) {
                throw err;
            }
            const delay = BASE_DELAY * 2 ** attempt;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    if (lastServerErrorResponse) { return lastServerErrorResponse; }
    throw lastError ?? new Error("Unknown error during fetch");
}

export default reinforcedFetch;
