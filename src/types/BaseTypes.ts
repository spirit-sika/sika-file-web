/**
 * 统一响应格式
 */
export interface R<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 实体公共字段
 */
export interface BaseEntity {
  /** 创建时间 */
  createTime: string;
  /** 创建人用户名 */
  createBy: string;
  /** 创建人ID */
  createId: number;
  /** 更新时间 */
  updateTime: string;
  /** 更新人用户名 */
  updateBy: string;
  /** 更新人ID */
  updateId: number;
}

/**
 * 分页查询请求DTO
 * @template T 实体类型
 */
export interface PageQuery<T = any> {
  current?: number
  size?: number
  condition?: T
}

/**
 * 分页查询内容视图对象(需包裹在公共响应格式的data域中)
 */
export interface PageResponse<T = any> {
  /**
   * 总条数
   */
  total: number;
  /**
   * 页面大小
   */
  size: number;
  /**
   * 当前页码
   */
  current: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 数据集
   */
  records: T[];
}






