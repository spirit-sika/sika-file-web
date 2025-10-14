<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="model"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="folder name" prop="title">
      <el-input v-model="model.title" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';

const model = ref<{title: string}>({title: ''});
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<{title: string}>>({
  title: [
    {required: true, message: 'Please input folder name', trigger: 'blur'},
    {min: 1, max: 255, message: 'Length should be 1 to 255', trigger: 'blur'}
  ]
})

function validate() {
  if (ruleFormRef.value) {
    return ruleFormRef.value.validate()
  }
  return Promise.reject()
}

function clearAndReset() {
  ruleFormRef.value?.resetFields()
}

defineExpose({
  model,
  ruleFormRef,
  validate,
  clearAndReset
})
</script>

<style scoped>

</style>