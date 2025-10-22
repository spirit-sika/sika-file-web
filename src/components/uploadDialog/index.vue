<template>
  <el-dialog
    v-model="show"
    modal-class="override-animation"
    @close="close"
  >
    <template v-slot:default>
      <div class="dialog-title-wrapper">
        <span>{{title}}</span>
      </div>
      <template v-if="dialogType === 'mkdir'">
        <create-folder ref="createFolderRef"/>
      </template>
      <template v-else>
        <upload-file ref="uploadFileRef"/>
      </template>
    </template>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useTemplateRef} from "vue";
import {useRoute} from "vue-router";
import CreateFolder from "@/components/uploadDialog/CreateFolder.vue";
import UploadFile from "@/components/uploadDialog/UploadFile.vue";
import {postDir} from "@/api/fms.ts";

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

const emit = defineEmits(['update:visible', 'complete'])

const route = useRoute()
const show = computed({
  get() {
    return prop.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
const title = computed(() => {
  return prop.dialogType === 'mkdir' ? 'Create Folder' : 'Upload File'
})

const createFolderRef = useTemplateRef('createFolderRef')
const uploadFileRef = useTemplateRef('uploadFileRef')
const submit = () => {
  if (prop.dialogType === 'mkdir') {
    if (createFolderRef.value) {
      createFolderRef.value.ruleFormRef!.validate()
        .then(valid => {
          if (!valid) {
            return
          }
          const content = createFolderRef.value!.model.title
          createFolderRef.value!.clearAndReset()
          postDir(content, route.params.id as string)
            .then(res => {
              if (res.code !== 200) {
                throw new Error(res.message)
              }
              show.value = false
              ElMessage.success('create folder success!')
              emit('complete')
            })
            .catch(err => {
              ElMessage.error(err.message)
            })
        })
    }
    else {
      ElMessage.error('could not found the form component')
    }
  }
  else {
    if (uploadFileRef.value) {
      if (uploadFileRef.value.finishing) {
        ElMessage.warning('Uploading... Please wait!')
      }
      else {
        show.value = false
        emit('complete')
      }
    }
    else {
      ElMessage.error('could not found the upload component')
    }
  }
}

const cancel = () => {
  close()
}

const close = () => {
  if (createFolderRef.value) {
    createFolderRef.value.clearAndReset()
  }
  show.value = false
}
</script>

<style scoped>
.dialog-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;

  > span {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>