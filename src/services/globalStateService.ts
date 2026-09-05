import { storage } from '../helpers/storage';
import appStore from '../stores/appStore';
import { AppSetting } from '../stores/globalStateStore';

class GlobalStateService {
  constructor() {
    const cachedSetting = storage.get([
      'shouldSplitMemoWord',
      'shouldHideImageUrl',
      'shouldUseMarkdownParser',
    ]);
    const defaultAppSetting = {
      shouldSplitMemoWord: cachedSetting.shouldSplitMemoWord ?? true,
      shouldHideImageUrl: cachedSetting.shouldHideImageUrl ?? true,
      shouldUseMarkdownParser: cachedSetting.shouldUseMarkdownParser ?? true,
    };

    // 清理已退役 tiny-undo 的历史 localStorage 残留（P2 原生 history 取代）
    storage.removeRaw('useTinyUndoHistoryCache');
    storage.removeRaw('tinyUndoActionsCache');
    storage.removeRaw('tinyUndoIndexCache');

    this.setAppSetting(defaultAppSetting);
  }

  public getState = () => {
    return appStore.getState().globalState;
  };

  public setEditMemoId = (editMemoId: string) => {
    appStore.dispatch({
      type: 'SET_EDIT_MEMO_ID',
      payload: {
        editMemoId,
      },
    });
  };

  /** toggle 引用目标（多引用）：id='' 清空全部；已选则移除；未选则追加 */
  public setMarkMemoId = (markMemoId: string) => {
    appStore.dispatch({
      type: 'SET_MARK_MEMO_ID',
      payload: {
        markMemoId,
      },
    });
  };

  public setIsMobileView = (isMobileView: boolean) => {
    appStore.dispatch({
      type: 'SET_MOBILE_VIEW',
      payload: {
        isMobileView,
      },
    });
  };

  public setShowSiderbarInMobileView = (showSiderbarInMobileView: boolean) => {
    appStore.dispatch({
      type: 'SET_SHOW_SIDEBAR_IN_MOBILE_VIEW',
      payload: {
        showSiderbarInMobileView,
      },
    });
  };

  public setAppSetting = (appSetting: Partial<AppSetting>) => {
    appStore.dispatch({
      type: 'SET_APP_SETTING',
      payload: appSetting,
    });
    storage.set(appSetting);
  };
}

const globalStateService = new GlobalStateService();

export default globalStateService;
