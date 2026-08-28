import type { MemosSettings } from '../setting';

/**
 * settingsStore — 把 MemosSettings 放进响应式 store，
 * 让 React 组件能订阅设置变更（替代从 memos.ts 读全局 let）。
 *
 * 组件通过 useContext(appContext).settingsState 读取；
 * 视图 onOpen 时通过 setSettings action 注入 plugin.settings。
 */

export interface State {
  settings: MemosSettings;
}

export const defaultState: State = {
  // 空设置占位，onOpen 时会被真实设置覆盖
  settings: {} as MemosSettings,
};

interface SetSettingsAction {
  type: 'SET_SETTINGS';
  payload: {
    settings: MemosSettings;
  };
}

export type Actions = SetSettingsAction;

export const reducer = (state: State = defaultState, action: Actions): State => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload.settings };
    default:
      return state;
  }
};
