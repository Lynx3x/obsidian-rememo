import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import SendIcon from '../icons/send.svg?component';
import { t } from '../translations/helper';

/**
 * 轻量评论输入框：自包含（textarea + 右下角发送按钮），无工具栏/自动补全。
 * 兼容 EditorRefActions 的 ref 接口（element/focus/insertText/setContent/getContent）。
 */

export interface CommentInputRef {
  element: HTMLTextAreaElement;
  focus: () => void;
  insertText: (text: string) => void;
  setContent: (text: string) => void;
  getContent: () => string;
}

interface Props {
  placeholder?: string;
  showCancelBtn?: boolean;
  onConfirmBtnClick: (content: string) => void;
  onCancelBtnClick?: () => void;
}

// eslint-disable-next-line react/display-name
const CommentInput = forwardRef<CommentInputRef, Props>((props, ref) => {
  const { placeholder, showCancelBtn, onConfirmBtnClick, onCancelBtnClick } = props;
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      get element() {
        return textareaRef.current!;
      },
      focus: () => {
        textareaRef.current?.focus();
      },
      insertText: (text: string) => {
        const el = textareaRef.current;
        if (!el) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const next = el.value.slice(0, start) + text + el.value.slice(end);
        setValue(next);
        // 光标移到插入后
        requestAnimationFrame(() => {
          el.focus();
          el.setSelectionRange(start + text.length, start + text.length);
        });
      },
      setContent: (text: string) => {
        setValue(text);
      },
      getContent: () => textareaRef.current?.value ?? '',
    }),
    [],
  );

  const handleSend = () => {
    const content = value.trim();
    if (content === '') return;
    setValue('');
    onConfirmBtnClick(content);
  };

  return (
    <div className="memo-comment-input">
      <textarea
        className="memo-comment-input-textarea"
        ref={textareaRef}
        placeholder={placeholder || t('Comment it...')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // Enter 发送，Shift+Enter 换行
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      {showCancelBtn ? (
        <button className="memo-comment-cancel-btn" onClick={onCancelBtnClick}>
          {t('Cancel')}
        </button>
      ) : null}
      <button
        className="memo-comment-send-btn"
        onClick={handleSend}
        disabled={!value.trim()}
        title="Send"
      >
        <SendIcon className="icon-img" />
      </button>
    </div>
  );
});

export default CommentInput;
