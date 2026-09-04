import React from 'react';
import Memos from '../pages/Memos';
import MemoTrash from '../pages/MemoTrash';
import AuditPage from '../audit/ui/AuditPage';

const homeRouter = {
  '/recycle': <MemoTrash />,
  '/audit': <AuditPage />,
  '*': <Memos />,
};

export default homeRouter;
