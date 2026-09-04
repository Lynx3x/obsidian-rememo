import React from 'react';
import Memos from '../pages/Memos';
import MemoTrash from '../pages/MemoTrash';

const homeRouter = {
  '/recycle': <MemoTrash />,
  '*': <Memos />,
};

export default homeRouter;
