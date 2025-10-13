<template>
  <el-dialog
    v-model="show"
    modal-class="overide-animation"
    @open="console.log('open')"
    @open-auto-focus="console.log('open-auto-focus')"
    @opened="console.log('opened')"
    @close="console.log('close')"
    @close-auto-focus="console.log('close-auto-focus')"
    @closed="console.log('closed')"
  >
    <template v-slot:default>
      <span>{{prop.dialogType}}</span>
    </template>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="show = false">Cancel</el-button>
        <el-button type="primary" @click="show = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {computed} from "vue";

defineOptions({
  name: 'UploadDialog'
})

const prop = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dialogType: {
    type: String,
    default: 'upload'
  }
})

const emit = defineEmits(['update:visible'])

const show = computed({
  get() {
    return prop.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
</script>

<style scoped>

</style>