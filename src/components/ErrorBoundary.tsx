import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * 路由内容兜底：子组件渲染崩溃时显示错误文字，而不是整页白屏。
 * 白屏对用户是「插件坏了，不知道为什么」，这里至少把错误信息摆出来（方便反馈/排查）。
 */
class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="rememo-error-boundary">
          <p className="rememo-error-boundary-title">Something went wrong while rendering this page.</p>
          <pre className="rememo-error-boundary-msg">{error?.message || String(error)}</pre>
          <button className="rememo-error-boundary-btn" onClick={() => this.setState({ error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
