import {defineStore} from 'pinia'
import {onBeforeUnmount, ref} from "vue";
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";

export const useRightMenuStore = defineStore('rightMenu', () => {
  const menuVisible = ref(false);
  const menuX = ref(0)
  const menuY = ref(0)

  /**
   * 文件夹菜单项
   */
  const folderMenuItems = [
    {
      label: 'Open',
      action: () => {
        console.log('open-folder');
      }
    },
    {
      label: 'Delete',
      action: () => {
        console.log('delete');
      }
    }
  ];

  /**
   * 文件菜单项
   */
  const fileMenuItems = [
    {
      label: 'Preview',
      action: () => {
        console.log('preview-file');
      }
    },
    {
      label: 'Download',
      action: () => {
        console.log('download');
      }
    },
    {
      label: 'Delete',
      action: () => {
        console.log('delete');
      }
    }
  ];

  const menuItems = ref(folderMenuItems);

  /**
   * 菜单显隐
   * @param event 点击事件
   * @param item 文件对象
   */
  const menuSwitch = (event?: MouseEvent, item?: SikaFileMeta) => {
    if (!event || !item) {
      hideMenu()
      return
    }
    if (item.metaType === MetaTypeEnum.DIR.value) {
      menuItems.value = folderMenuItems;
    }
    else {
      menuItems.value = fileMenuItems;
    }
    if (menuVisible.value) {
      hideMenu()
    }
    else {
      showMenu(event)
    }
  }

  const showMenu = (event: MouseEvent) => {
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
    menuVisible.value = false;
    document.removeEventListener('click', hideMenu);
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', hideMenu);
  })

  return {
    menuVisible,
    menuX,
    menuY,
    menuItems,
    menuSwitch
  }
})