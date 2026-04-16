import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type {
  CurrentUserResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth.types";

export async function login(payload: LoginPayload) {
  const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, payload);
  return res.data;
}

export async function register(payload: RegisterPayload) {
  const res = await apiClient.post(ENDPOINTS.AUTH.REGISTER, payload);
  return res.data;
}

export async function logout() {
  const res = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  return res.data;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const res = await apiClient.get(ENDPOINTS.AUTH.ME);
  return res.data;
}
export async function forgotPassword(payload: ForgotPasswordPayload) {
  const res = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
  return res.data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const res = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, payload);
  return res.data;
}
