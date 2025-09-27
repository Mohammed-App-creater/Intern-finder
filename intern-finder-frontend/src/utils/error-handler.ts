// utils/error-handler.ts
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

interface AxiosErrorResponse {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
    error?: string;
  };
  status?: number;
}

interface AxiosError extends Error {
  response?: AxiosErrorResponse;
  code?: string;
}

interface CustomError extends Error {
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Type guards
const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "response" in error;
};

const isCustomError = (error: unknown): error is CustomError => {
  return typeof error === "object" && error !== null && "message" in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    // Handle network errors
    if (isAxiosError(error)) {
      if (error.code === "NETWORK_ERROR" || error.code === "ECONNREFUSED") {
        return "Network error: Please check your internet connection";
      }

      if (error.response?.data) {
        // Try to get meaningful error message from response
        const { data } = error.response;

        if (data.message) {
          return data.message;
        }

        if (data.error) {
          return data.error;
        }

        if (data.errors) {
          // Join all validation errors
          const errorMessages = Object.values(data.errors).flat();
          return errorMessages.join(", ") || "Validation error occurred";
        }

        // Default status-based messages
        switch (error.response.status) {
          case 400:
            return "Bad request: Please check your input data";
          case 401:
            return "Unauthorized: Please login again";
          case 403:
            return "Forbidden: You don't have permission";
          case 404:
            return "Not found: The requested resource was not found";
          case 409:
            return "Conflict: This email is already registered";
          case 422:
            return "Validation error: Please check your input";
          case 500:
            return "Server error: Please try again later";
          default:
            return `Request failed with status ${error.response.status}`;
        }
      }

      if (error.message) {
        return error.message;
      }
    }

    return error.message;
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};

export const getErrorDetails = (error: unknown): ApiError => {
  const message = getErrorMessage(error);

  if (isAxiosError(error) && error.response) {
    return {
      message,
      statusCode: error.response.status,
      errors: error.response.data?.errors,
    };
  }

  if (isCustomError(error)) {
    return {
      message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  return { message };
};

// Helper function to extract validation errors
export const getValidationErrors = (error: unknown): Record<string, string> => {
  if (isAxiosError(error) && error.response?.data?.errors) {
    const errors: Record<string, string> = {};
    Object.entries(error.response.data.errors).forEach(([key, messages]) => {
      errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
    });
    return errors;
  }
  return {};
};
