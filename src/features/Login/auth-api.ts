import {instance} from "api/common-api";
import {AxiosResponse} from "axios";
import {LoginDataType, ResponseType} from "common/types/types";
export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginDataType>
        ('auth/login', loginData)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get('auth/me')
    }
}