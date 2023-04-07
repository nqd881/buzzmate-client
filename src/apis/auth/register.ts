import { ApiClient } from "../base";

export type RegisterApiPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;
  gender: "male" | "female";
  phoneNumber: string;
  birthDate?: Date;
};

export type RegisterResult = {};

export const registerApi = (data: RegisterApiPayload) => {
  return ApiClient.post("/api/iam-svc/user/registration", data);
};
