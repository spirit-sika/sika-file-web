/**
 * 文件系统相关API, 如文件列表获取, 文件元数据获取等
 */

import {get, post} from "@/util/request.ts";
import type {SikaFileMeta} from "@/types/fms.ts";
import type {PageQuery, PageResponse, R} from "@/types/BaseTypes.ts";

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
  return await post<SikaFileMeta>(`file/mkdir?name=${name}&parentId=${currentId}`)
}

export const postFileWithProgress = async (data: FormData, onMessage?: (data: number) => void, onError?: (error: Error) => void) => {
  const toRoot = !data.has('parentId') || data.get('parentId') === 'root'
  const response = await fetch( toRoot ? '/api/file/sync-progress-root' : '/api/file/sync-progress' , {
    method: 'POST',
    body: data,
    headers: {
      Accept: 'text/event-stream',
    },
  });

  if (!response.ok || !response.body) {
    if (onError) {
      onError(new Error(`Upload failed with status ${response.status}`))
      return
    }
    else {
      throw new Error(`Upload failed with status ${response.status}`)
    }
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let done = false;
  while (true) {
    const result = await reader.read();

    // 通过数据确定上传完毕不再继续处理, sse可能会发送多次进度100导致多次处理上传成功
    if (done) {
      break;
    }
    else {
      done = result.done;
    }

    const value = result.value;

    buffer += decoder.decode(value, { stream: true });

    // SSE 事件通常以 \n\n 分隔
    const parts = buffer.split('\n\n');
    buffer = parts.pop() ?? '';

    for (const part of parts) {
      if (part.startsWith('data:')) {
        const dataStr = part.replace(/^data:\s*/, '').trim();
        try {
          const parsed: R<number> = JSON.parse(dataStr);
          if (parsed.code === 200) {
            // 完成时退出循环
            if (parsed.data === 100) {
              // 上传完成（100%）
              done = true;
              onMessage?.(100);
              break
            }
            else {
              onMessage?.(parsed.data);
            }
          }
          else {
            console.warn('Unexpected SSE data format:', parsed);
          }
        }
        catch (err) {
          if (onError) {
            onError(new Error(`Failed to parse SSE chunk:${err}, ${part}`))
          }
        }
      }
    }
  }
}
