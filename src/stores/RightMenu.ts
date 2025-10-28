import {defineStore} from 'pinia'
import {ref} from "vue";

export const useRightMenuStore = defineStore('rightMenu', () => {
  const menuVisible = ref(false);


  return {
    menuVisible
  }
})