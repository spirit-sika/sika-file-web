<template>
  <div class="path-navigation">
    <div
      v-for="(item, index) in path"
      :key="index"
      class="path-item"
      @click="$emit('navigate', index)"
    >
      <span>{{ item.name }}</span>
      <span v-if="index < path.length - 1" class="path-separator">/</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PathNavigation'
})

defineProps<{path: {id: string, name: string}[]}>()

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
  margin: 0 8px;
  color: #c0c4cc;
}
</style>