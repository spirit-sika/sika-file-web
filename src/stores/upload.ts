import {defineStore} from "pinia";
import {ref} from "vue";

export const useUploadStore = defineStore('upload',
  () => {

    /* 弹窗控制参数 */
    const dialogType = ref<'upload' | 'mkdir'>('upload')
    const visible = ref<boolean>(false)


    return {
      dialogType,
      visible
    }
  }
)