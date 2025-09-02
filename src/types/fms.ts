import type {BaseEntity} from "@/types/BaseTypes.ts";

/**
 * 文件元数据
 */
export interface SikaFileMeta extends BaseEntity {
  /** ID */
  id: string;
  /** 父级ID */
  parentId: string;
  /** 元类型 (1-文件夹, 2-文件) */
  metaType: number;
  /** 原始文件名 */
  originalName: string;
  /** 文件MIME类型 */
  fileMime: string;
  /** 文件扩展名（带点） */
  fileExtension: string;
  /** 文件大小（字节数） */
  fileSize: number;
  /** S3/OSS存储路径（加密） */
  storagePath: string;
  /** 文件预览ISS存储路径 */
  previewPath: string;
  /** 文件系统中的绝对路径 */
  absolutePath: string;
  /** 文件SHA256哈希值 */
  sha256: string;
  /** 目标区域（US/CN/ALL） */
  regionTarget: string;
}