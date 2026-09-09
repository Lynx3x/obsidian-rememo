import React from 'react';
import Memos from '../pages/Memos';
import MemoTrash from '../pages/MemoTrash';
import AuditPage from '../audit/ui/AuditPage';
import type { Router } from './index';

// 回收站总开关：关闭时路由表不含 '/recycle'（彻底封锁——任何直达/残留 pathname 都落入 '*' 兜底主页）
export const getHomeRouter = (enableRecycleBin: boolean): Router => {
  const router: Router = {
    '/audit': <AuditPage />,
    '*': <Memos />,
  };
  if (enableRecycleBin) {
    router['/recycle'] = <MemoTrash />;
  }
  return router;
};
