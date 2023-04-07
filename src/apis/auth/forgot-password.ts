import { ApiClient } from "@apis/base";

export type ForgotPasswordPayload = {
  emailAddress: string;
};

export const forgotPasswordApi = (data: ForgotPasswordPayload) => {
  return ApiClient.post("/api/iam-svc/auth/password_reset/code", data);
};
