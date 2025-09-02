/**
 * 文件系统相关API, 如文件列表获取, 文件元数据获取等
 */

import {get} from "@/util/request.ts";
import type {SikaFileMeta} from "@/types/fms.ts";

/**
 * 获取文件列表
 * @param dirId 文件夹ID
 */
export const requestFileList = async (dirId: string) => {
  return await get<SikaFileMeta[]>(`file`, {
    dirId
  })
}
