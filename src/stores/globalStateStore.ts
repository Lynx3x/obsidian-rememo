export interface AppSetting {
  shouldSplitMemoWord: boolean;
  shouldHideImageUrl: boolean;
  shouldUseMarkdownParser: boolean;
}

export interface State extends AppSetting {
  /** P3c 待引用目标集合（可多引用；点击同卡移除、''=清空） */
  markMemoIds: string[];
  editMemoId: string;
  isMobileView: boolean;
  showSiderbarInMobileView: boolean;
}

interface SetMarkMemoIdsAction {
  type: 'SET_MARK_MEMO_ID';
  payload: {
    markMemoId: string;
  };
}

interface SetEditMemoIdAction {
  type: 'SET_EDIT_MEMO_ID';
  payload: {
    editMemoId: string;
  };
}

interface SetMobileViewAction {
  type: 'SET_MOBILE_VIEW';
  payload: {
    isMobileView: boolean;
  };
}

interface SetShowSidebarAction {
  type: 'SET_SHOW_SIDEBAR_IN_MOBILE_VIEW';
  payload: {
    showSiderbarInMobileView: boolean;
  };
}

interface SetAppSettingAction {
  type: 'SET_APP_SETTING';
  payload: Partial<AppSetting>;
}

export type Actions =
  | SetMobileViewAction
  | SetShowSidebarAction
  | SetEditMemoIdAction
  | SetMarkMemoIdsAction
  | SetAppSettingAction;

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SET_MARK_MEMO_ID': {
      const id = action.payload.markMemoId;
      if (id === '') {
        // 清空（发送完成/取消）
        if (state.markMemoIds.length === 0) return state;
        return { ...state, markMemoIds: [] };
      }
      // toggle：已选则移除（取消该目标），否则追加（多引用积累）
      const has = state.markMemoIds.includes(id);
      return {
        ...state,
        markMemoIds: has ? state.markMemoIds.filter((x) => x !== id) : [...state.markMemoIds, id],
      };
    }
    case 'SET_EDIT_MEMO_ID': {
      if (action.payload.editMemoId === state.editMemoId) {
        return state;
      }

      return {
        ...state,
        editMemoId: action.payload.editMemoId,
      };
    }
    case 'SET_MOBILE_VIEW': {
      if (action.payload.isMobileView === state.isMobileView) {
        return state;
      }

      return {
        ...state,
        isMobileView: action.payload.isMobileView,
      };
    }
    case 'SET_SHOW_SIDEBAR_IN_MOBILE_VIEW': {
      if (action.payload.showSiderbarInMobileView === state.showSiderbarInMobileView) {
        return state;
      }

      return {
        ...state,
        showSiderbarInMobileView: action.payload.showSiderbarInMobileView,
      };
    }
    case 'SET_APP_SETTING': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const defaultState: State = {
  markMemoIds: [],
  editMemoId: '',
  shouldSplitMemoWord: true,
  shouldHideImageUrl: true,
  shouldUseMarkdownParser: true,
  isMobileView: false,
  showSiderbarInMobileView: false,
};
