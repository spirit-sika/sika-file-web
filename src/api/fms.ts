/**
 * 文件系统相关API, 如文件列表获取, 文件元数据获取等
 */

import {get} from "@/util/request.ts";
import type {SikaFileMeta} from "@/types/fms.ts";
import type {PageQuery, PageResponse} from "@/types/BaseTypes.ts";

/**
 * 获取文件列表
 * @param dirId 文件夹ID
 */
export const requestFileList = async (dirId: string) => {
  return await get<SikaFileMeta[]>(`file`, {
    dirId
  })
}

/**
 * 分页获取文件列表
 * @param fileMetaDto 分页查询信息以及查询条件
 */
export const requestFilePage = async (fileMetaDto: PageQuery<Partial<SikaFileMeta>>) => {
  return await get<PageResponse<SikaFileMeta>>(`file/page`, fileMetaDto)
}

/**
 * 获取文件信息
 * @param {string} id 文件或文件夹id
 */
export const requestFileInfo = async (id: string) => {
  return await get<SikaFileMeta>(`file/info`, {id})
}

/**
 * 创建文件夹
 * @param name 文件夹名称
 * @param currentId 当前文件夹ID, 创建的目标文件夹的父级Id, 为空时创建在根目录下
 */
export const postDir = async (name: string, currentId?: string) => {
  return await get<SikaFileMeta>(`file/mkdir?name=${name}&id=${currentId}`)
}
