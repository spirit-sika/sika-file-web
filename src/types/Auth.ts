import type {BaseEntity} from "@/types/BaseTypes.ts";
import type {RequiredKeys} from "@/types/TypeConstructor.ts";

export type LoginModel = RequiredKeys<SikaUser&{captcha: string}, 'username' | 'password' | 'captcha'>

/**
 * 用户信息实体
 */
export interface SikaUser extends BaseEntity {
  id: number
  username: string
  password: string
  nickname: string
  email: string
  phone: number
  avatar: string
  /**
   * 性别: 0-未知, 1-男, 2-女
   */
  sex: 0 | 1 | 2
  /**
   * 状态, 0禁用, 1-正常, 2-已删除
   */
  status: 0 | 1 | 2
}
