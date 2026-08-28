import MemoEditor from '../components/MemoEditor';
import MemosHeader from '../components/MemosHeader';
import MemoFilter from '../components/MemoFilter';
import MemoList from '../components/MemoList';
import React, { useContext } from 'react';
import { Platform } from 'obsidian';
import appContext from '../stores/appContext';

function Memos() {
  const {
    settingsState: { settings },
  } = useContext(appContext);
  if (Platform.isMobile && settings.DefaultEditorLocation === 'Bottom') {
    return (
      <>
        <MemosHeader />
        <MemoFilter />
        <MemoList />
        <MemoEditor />
      </>
    );
  } else {
    return (
      <>
        <MemosHeader />
        <MemoEditor />
        <MemoFilter />
        <MemoList />
      </>
    );
  }
}

export default Memos;
