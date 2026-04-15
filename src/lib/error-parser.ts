import axios from "axios";
import type { ApiErrorResponse } from "@/types/api.types";

export function parseApiError(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      message: error.response?.data?.message || "Something went wrong",
      fieldErrors: error.response?.data?.errorSources || [],
      statusCode: error.response?.status || 500,
    };
  }

  return {
    message: "Something went wrong",
    fieldErrors: [],
    statusCode: 500,
  };
}
