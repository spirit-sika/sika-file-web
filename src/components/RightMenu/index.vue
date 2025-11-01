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
  menuItems: MenuItem[]
}

withDefaults(defineProps<Prop>(), {
  menuItems: () => []
})

const rightMenuStore = useRightMenuStore()
const emit = defineEmits(['menu-click'])

const {menuVisible, menuX, menuY} = storeToRefs(rightMenuStore)
const {menuSwitch} = rightMenuStore


const handleClick = (action?: () => void) => {
  if (action && typeof action === 'function') {
    action()
    emit('menu-click')
  }
  else {
    defaultAction()
  }
  menuSwitch()
}

const defaultAction = () => {
  emit('menu-click')
}
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
