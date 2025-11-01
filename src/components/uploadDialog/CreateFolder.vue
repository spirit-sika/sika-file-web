<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="model"
    :rules="rules"
    label-width="auto"
    @submit.native.prevent
  >
    <el-form-item label="folder name" prop="title">
      <el-input
        ref="inputRef"
        v-model="model.title"
        @keyup.enter="$emit('complete')"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
/**
 * @component CreateFolder
 * @description 创建文件夹表单
 * @example
 * <create-folder :prop="value" @event="handler" />
 * @props
 * - propName: 类型 - 说明
 * @emits
 * - eventName: 触发时机说明
 */

import {nextTick, reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';

defineEmits(['complete'])
defineOptions({
  name: 'CreateFolder'
})

/**
 * 表单数据对象
 */
const model = ref<{title: string}>({title: ''});

/**
 * 表单实例
 */
const ruleFormRef = ref<FormInstance>()

/**
 * 输入框实例
 */
const inputRef = ref<HTMLInputElement|null>(null)

/**
 * 检验规则
 */
const rules = reactive<FormRules<{title: string}>>({
  title: [
    {required: true, message: 'Please input folder name', trigger: 'blur'},
    {min: 1, max: 255, message: 'Length should be 1 to 255', trigger: 'blur'}
  ]
})

/**
 * 表单校验
 */
function validate() {
  if (ruleFormRef.value) {
    return ruleFormRef.value.validate()
  }
  return Promise.reject()
}

/**
 * 清空表单并重置校验
 */
function clearAndReset() {
  ruleFormRef.value?.resetFields()
}

/**
 * 自动聚焦到输入框
 */
const focus = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

defineExpose({
  model,
  ruleFormRef,
  validate,
  clearAndReset,
  focus
})
</script>
