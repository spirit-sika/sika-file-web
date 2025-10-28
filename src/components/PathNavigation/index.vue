<template>
  <div class="path-navigation">
    <div
      v-for="(item, index) in path"
      :key="index"
      class="path-item"
      @click="navigateTo(item.id)"
    >
      <span>{{ item.name }}</span>
      <span v-if="index < path.length - 1" class="path-separator">/</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component PathNavigation
 * @description 路径导航组件, 提供当前文件夹路径展示与单交跳转控制
 * @props {Props} 路径数据数组, 包含文件夹id与名称
 */
defineOptions({
  name: 'PathNavigation'
})

interface Props {path: {id: string, name: string}[]}

defineProps<Props>()

const emit = defineEmits(['navigate'])

const navigateTo = (dirId: string) => {
  emit('navigate', dirId)
}
</script>

<style scoped>
.path-navigation {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.path-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
}

.path-item:hover {
  color: #409eff;
}

.path-separator {
  margin: 3px 8px;
  color: #c0c4cc;
}
</style>