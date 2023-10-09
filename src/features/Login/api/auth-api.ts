import { instance } from "api/common-api";
import { BaseResponseType, LoginDataType } from "common/types/types";

export const authAPI = {
  login(loginData: LoginDataType) {
    return instance.post<
      BaseResponseType<{ userId: number }> & BaseResponseType
    >("auth/login", loginData);
  },
  logout() {
    return instance.delete<BaseResponseType>("auth/login");
  },
  me() {
    return instance.get("auth/me");
  },
};
