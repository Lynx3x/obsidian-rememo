# Memo评论系统优化方案

## 当前存在的问题

1. 数据冗余
- memos 和 commentMemos 存储了重复的信息结构
- 每条评论都需要完整的时间戳和用户信息

2. 查询效率
- 需要遍历所有 memos 来找到特定评论的父 memo
- 评论与原 memo 的关联基于字符串匹配

3. 数据一致性
- 评论可能分散在不同位置（原笔记 vs 独立存储）
- 删除原 memo 时可能遗留孤立评论

4. 扩展性
- 当前结构难以支持多级评论
- 难以添加新的评论相关功能（如点赞、提醒等）

## 优化建议

### 1. 数据结构优化

```typescript
interface Memo {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  memoType: string;
  path: string;
  comments?: Comment[];  // 内联评论数组
  metadata?: {           // 额外元数据
    tags?: string[];
    mentions?: string[];
    hasComments: boolean;  // 快速检查是否有评论
  }
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  parentId: string;      // 直接引用父评论ID
  memoId: string;        // 直接引用原memo ID
  metadata?: {           // 评论特有元数据
    status?: string;
    type?: string;
  }
}
```

### 2. 存储优化

#### 方案A: 统一存储模式
- 所有评论统一存储在原笔记的子项中
- 优点：
  * 数据位置统一，便于管理
  * 保持上下文完整性
  * 便于数据导出和迁移
- 缺点：
  * 可能导致单个笔记文件过大
  * 不利于评论的单独管理

#### 方案B: 混合存储模式 (推荐)
- 短评论（如标记、状态更新）存储在原笔记中
- 长评论存储在单独的评论文件中
- 优点：
  * 平衡了存储效率和管理便利性
  * 支持更复杂的评论场景
  * 便于实现评论的版本控制
- 实现建议：
  ```typescript
  const COMMENT_LENGTH_THRESHOLD = 100; // 评论长度阈值
  
  function determineCommentStorage(comment: Comment): StorageType {
    return comment.content.length > COMMENT_LENGTH_THRESHOLD 
      ? StorageType.Separate 
      : StorageType.Inline;
  }
  ```

### 3. 查询优化

1. 索引优化
- 建立 memo-comment 关系的内存索引
- 使用 Map 结构提高查询效率
```typescript
const memoCommentIndex = new Map<string, Set<string>>();
```

2. 缓存策略
- 实现评论数据的内存缓存
- 增量更新而非全量重新加载

### 4. 接口优化

1. 引入新的评论操作接口
```typescript
interface CommentOperations {
  addComment(memoId: string, content: string): Promise<Comment>;
  removeComment(commentId: string): Promise<boolean>;
  updateComment(commentId: string, content: string): Promise<Comment>;
  getComments(memoId: string): Promise<Comment[]>;
}
```

2. 评论数据同步机制
```typescript
interface CommentSync {
  onCommentAdded(callback: (comment: Comment) => void): void;
  onCommentUpdated(callback: (comment: Comment) => void): void;
  onCommentRemoved(callback: (commentId: string) => void): void;
}
```

## 实施建议

1. 分阶段实施
- 第一阶段：数据结构优化
- 第二阶段：存储模式调整
- 第三阶段：查询优化
- 第四阶段：新功能添加

2. 数据迁移
- 提供数据迁移工具
- 确保向后兼容性

3. 测试策略
- 单元测试覆盖核心逻辑
- 性能测试验证优化效果
- 集成测试确保系统稳定性