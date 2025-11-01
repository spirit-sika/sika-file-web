import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {setToken, removeToken} from "@/util/token.ts";

export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref<string>('')
    function updateToken (token: string)  {
      userToken.value = token
    }

    watch(userToken, newVal => {
      if (newVal && newVal.length > 0) {
        setToken(newVal)
      }
      else {
        removeToken()
      }
    })

    return {
      userToken,
      updateToken
    }
  }
)