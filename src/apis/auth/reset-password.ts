import { ApiClient } from "@apis/base";

export type ResetPasswordPayload = {
  emailAddress: string;
  code: string;
  newPassword: string;
};

export const resetPasswordApi = (data: ResetPasswordPayload) => {
  return ApiClient.post("/api/iam-svc/auth/password_reset", data);
};
