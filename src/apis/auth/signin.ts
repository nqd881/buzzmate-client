import {ApiClient} from "../base";

export type SigninApiPayload = {
  usernameOrEmail: string;
  password: string;
};

export type SigninApiResponse = {
  accessToken: string;
  refreshToken: string;
};

export const signinApi = (data: SigninApiPayload) => {
  return ApiClient.post<SigninApiResponse, SigninApiResponse>(
    "/api/iam-svc/auth/signin",
    data
  );
};
