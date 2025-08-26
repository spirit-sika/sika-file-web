import {get, post} from "@/util/request.ts";
import type {LoginModel, SikaUser} from "@/types/Auth.ts";

/**
 * 获取公钥
 */
export const requestPrimaryKey = async () => {
  return await get<string>('auth/pk', null, true)
}

export const postRegister = async (data: SikaUser & {captcha: string}) => {
  return await post<string>('auth/register', data, true)
}

export const postLogin = async (data: LoginModel) => {
  return await post<string>('auth', data, true)
}

export const requestCaptcha = async () => {
  return await get<string>('auth/captcha', null, true)
}