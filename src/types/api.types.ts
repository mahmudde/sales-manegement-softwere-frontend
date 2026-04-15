export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorSource = {
  path: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorSources?: ApiErrorSource[];
};
