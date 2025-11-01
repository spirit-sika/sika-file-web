import {AxiosHeaders, type AxiosRequestConfig} from 'axios';
import axios from 'axios';
import type {InternalAxiosRequestConfig} from 'axios';
import type {R} from '@/types/BaseTypes.ts'
import qs from 'qs'
import {TOKEN_KEY, getToken} from '@/util/token.ts'

/**
 * 默认所有接口都需要鉴权, 不需要鉴权方法request提供notAuth参数值为true即可
 * 鉴权不通过强制跳转登录页重新登录
 */
interface SikaRequestConfig extends AxiosRequestConfig {
  notAuth?: boolean;
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 3600000
});

instance.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

instance.interceptors.request.use((config: SikaRequestConfig) => {
  // 需要鉴权接口处理, 校验用户是否已登录
  if (typeof config.notAuth === 'undefined' || !config.notAuth) {
    if (config.headers instanceof AxiosHeaders) {
      const token = getToken();
      // 获取不到token跳转登录页
      if (!token) {
        window.location.href = '/login'
      }
      config.headers[TOKEN_KEY] = token
    }
    else {
      throw new Error('axios header error')
    }
  }
  return config as InternalAxiosRequestConfig;
});

export const request = async <T = any>(config: SikaRequestConfig): Promise<R<T>> => {
  try {
    const response = await instance.request<R<T>>(config);
    // 服务器层面错误
    const {data} = response;
    return data;
  }
  catch (error) {
    // 网络层面错误
    return {
      code: 500,
      message: '请求失败',
      data: {} as T
    }
  }
  finally {}
};

// 将数据转为路径参数发送
export const get = <T = any>(url: string, data?: unknown, notAuth?: boolean) => {
  if (data !== undefined) {
    if (typeof data === 'string') {
      return request<T>({
        url: `${url}?${data}`,
        method: 'GET',
        notAuth: notAuth
      })
    }
    const dataStr = qs.stringify(data, {allowDots: true})
    return request<T>({
      url: `${url}?${dataStr}`,
      method: 'GET',
      notAuth: notAuth
    })
  }

  return request<T>({
    url: `${url}`,
    method: 'GET'
  })
}

export const post = <T = any>(url: string, data?: unknown, notAuth?: boolean) => {
  return request<T>({
    url: `${url}`,
    method: 'POST',
    data: data,
    notAuth: notAuth
  })
}