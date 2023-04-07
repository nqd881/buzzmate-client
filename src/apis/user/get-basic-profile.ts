import {ApiClient} from "@apis/base";

export const getBasicProfileApi = (userID: string) => {
  return ApiClient.get(`user/${userID}/profile/basic`);
};
