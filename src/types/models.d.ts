declare namespace Model {
  interface BaseModel {
    id: string;
    createdAt: string;
    updatedAt: string;
  }

  interface User extends BaseModel {
    username: string;
    githubName: string;
  }

  interface Memo extends BaseModel {
    content: string;
    deletedAt: string;
    memoType?: string;
    linkId?: string;
    hasId?: string;
    path?: string;
    isDeleted?: boolean;
    /** 所在日记文件中的块范围（0-based 行号，含端点）。单行旧格式 = 同行；新格式块 = 头行..末正文行 */
    blockStart?: number;
    blockEnd?: number;
  }

  interface Query extends BaseModel {
    title: string;
    querystring: string;
    pinnedAt: string;
  }

  interface Resource {
    id: string;
    filename: string;
    type: string;
    size: string;
    createdAt: string;
  }
}
