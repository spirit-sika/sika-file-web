import {onMounted, ref, watch} from 'vue'
import {JSEncrypt} from "jsencrypt";
import {postRegister, requestCaptcha, requestPrimaryKey} from '@/api/authApi.ts'
import {cloneDeep} from 'lodash'
import {useRouter} from 'vue-router'
import type {LoginModel, SikaUser} from '@/types/Auth.ts'
import {useUserStore} from "@/stores/user.ts";
import {postLogin} from "@/api/authApi.ts";


export const useLoginHooks = () => {
  // 用户token处理与本地持久化
  const {updateToken} = useUserStore()
  const router = useRouter()
  // 公钥处理
  const publicKey = ref<string>('')
  const encrypt = new JSEncrypt()
  // 处理用户登录数据
  const loginUser = ref<LoginModel & {captcha: string}>({
    username: '',
    password: '',
    captcha: ''
  })
  const captchaBase64 = ref<string>('')

  watch(publicKey, newVal => {
    encrypt.setPublicKey(newVal)
  })

  // 获取公钥
  function loadPublicKey() {
    requestPrimaryKey()
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        publicKey.value = res.data
      })
      .catch(ElMessage.error)
  }

  // 加密登录/注册对象
  function encryptUserModel(model: Partial<SikaUser & {captcha: string}>) {
    if (!publicKey.value || !encrypt || !encrypt.getPublicKey()) {
      throw new Error('encrypt tool error')
    }
    const username = encrypt.encrypt(model.username ?? '').toString()
    const password = encrypt.encrypt(model.password ?? '').toString()
    const result = cloneDeep(model) as SikaUser & {captcha: string}
    result.username = username
    result.password = password
    if (typeof model.nickname === 'string' && model.nickname.length > 0) {
      result.nickname = model.nickname
    }
    return result
  }

  function handleLogin() {
    // 使用公钥加密用户对象
    const encryptedUser = encryptUserModel(loginUser.value)
    postLogin(encryptedUser)
      .then(res => {
        if (res.code !== 200) {
          throw new Error(res.message)
        }
        // 登录成功存储token并跳转
        updateToken(res.data)
        return router.push({name: 'tree'})
      })
      .then(() => ElMessage.success('登录成功'))
      .catch(err => {
        ElMessage.error(err.message)
        console.error(err)
        loadCaptcha()
      })
  }

  /**
   * 接收用户, 对敏感信息(用户名&密码)进行公钥加密后提交注册
   */
  function handleRegister() {
    // 使用公钥加密用户对象
    postRegister(encryptUserModel(loginUser.value))
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        updateToken(res.data)
      })
      .then(() => {
        return router.push('chat')
      })
      .then(() => {
        ElMessage.success('注册成功')
      })
      .catch(ElMessage.error)
  }

  function loadCaptcha() {
    requestCaptcha()
      .then(res => {
        if (res.code !== 200) {
          throw new Error('获取验证码失败!, 错误码:' + res.code)
        }
        captchaBase64.value = res.data
      })
      .catch(err => {
        ElMessage.error(err.message)
        console.error(err)
      })
  }

  onMounted(() => {
    loadPublicKey()
  })

  loadCaptcha()

  return {
    loginUser,
    captchaBase64,
    loadCaptcha,
    handleLogin,
    handleRegister
  }
}