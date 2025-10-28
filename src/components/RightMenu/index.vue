<template>
  <div
    :style="{ left: menuX + 'px', top: menuY + 'px' }"
    v-show="menuVisible"
    class="context-menu"
  >
    <div @click.stop>
      <slot></slot>
      <div
        v-for="item in menuItems"
        :key="item.id || item.label"
        @click="handleClick(item.action)"
        class="menu-item"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, ref} from 'vue'
import {storeToRefs} from "pinia";
import {useRightMenuStore} from "@/stores/RightMenu.ts";

defineOptions({
  name: 'RightMenu'
})

interface MenuItem {
  id?: number
  label: string
  action?: () => void
}

interface Prop {
  menuItems: MenuItem[],
  groupId: string
}

withDefaults(defineProps<Prop>(), {
  menuItems: () => []
})

const rightMenuStore = useRightMenuStore()
const emit = defineEmits(['menu-click'])

const {menuVisible} = storeToRefs(rightMenuStore)
const menuX = ref(0)
const menuY = ref(0)

const showMenu = (groupId: string, event: MouseEvent) => {
  menuVisible.value = false;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
  menuVisible.value = true;

  // 添加全局点击监听器来隐藏菜单
  setTimeout(() => {
    document.addEventListener('click', hideMenu);
  }, 0);
}

const hideMenu = () => {
  menuVisible.value = false
  document.removeEventListener('click', hideMenu);
}

const handleClick = (action?: () => void) => {
  emit('menu-click', action ?? defaultAction);
  hideMenu();
}

const defaultAction = () => {}

onBeforeUnmount(() => {
  document.removeEventListener('click', hideMenu);
})

defineExpose({
  showMenu,
  hideMenu,
  menuVisible
})
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  min-width: 120px;
}

.menu-item {
  padding: 8px 12px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}
</style>
