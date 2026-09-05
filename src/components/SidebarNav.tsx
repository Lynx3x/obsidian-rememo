import React, { useCallback, useContext } from 'react';
import appContext from '../stores/appContext';
import { locationService } from '../services';
import dailyNotesService from '../services/dailyNotesService';
import showRandomMemoDialog from './RandomMemoDialog';
import Home from '../icons/home.svg?component';
import Trash from '../icons/delete.svg?component';
import Settings from '../icons/settings.svg?component';
import Casino from '../icons/casino.svg?component';
import { t } from '../translations/helper';

// ADR-0004：页面导航（主页/回收站/设置 + 🎲 随机动作项），竖排于热力图下、查询列表上；sticky 常驻
const SidebarNav: React.FC = () => {
  const {
    locationState: { pathname },
  } = useContext(appContext);

  const onHome = pathname === '/' || pathname === '/homeboard';
  const onRecycle = pathname === '/recycle';

  const handleHomeClick = useCallback(() => {
    locationService.pushHistory('/');
    locationService.clearQuery();
  }, []);

  const handleRecycleClick = useCallback(() => {
    locationService.pushHistory('/recycle');
  }, []);

  const handleSettingsClick = useCallback(() => {
    const { app } = dailyNotesService.getState();
    //@ts-expect-error, private method
    app.setting.open();
    //@ts-expect-error, private method —— 插件更名 rememo，旧 id obsidian-memos 已失效（ADR-0004 顺带修复）
    app.setting.openTabById('rememo');
  }, []);

  const handleRandomClick = useCallback(() => {
    showRandomMemoDialog();
  }, []);

  return (
    <div className="memos-sidebar-nav">
      <div
        className={`memos-nav-item${onHome ? ' active' : ''}`}
        onClick={handleHomeClick}
        title={t('Home')}
      >
        <Home className="icon-img" />
        <span className="nav-text">{t('Home')}</span>
      </div>
      <div
        className={`memos-nav-item${onRecycle ? ' active' : ''}`}
        onClick={handleRecycleClick}
        title={t('Recycle bin')}
      >
        <Trash className="icon-img" />
        <span className="nav-text">{t('Recycle bin')}</span>
      </div>
      <div className="memos-nav-item" onClick={handleSettingsClick} title={t('Settings')}>
        <Settings className="icon-img" />
        <span className="nav-text">{t('Settings')}</span>
      </div>
      <div className="memos-nav-item action" onClick={handleRandomClick} title={t('Random memo')}>
        <Casino className="icon-img" />
        <span className="nav-text">{t('Random memo')}</span>
      </div>
    </div>
  );
};

export default SidebarNav;
