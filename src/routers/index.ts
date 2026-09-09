import appRouter from './appRouter';
import { getHomeRouter } from './homeRouter';

// just like React-Router
export interface Router {
  [key: string]: JSX.Element | null;
  '*': JSX.Element | null;
}

const routerSwitch = (router: Router) => {
  return (pathname: string) => {
    for (const key of Object.keys(router)) {
      if (key === pathname) {
        return router[key];
      }
    }
    return router['*'];
  };
};

export const appRouterSwitch = routerSwitch(appRouter);
/** 主视图路由按回收站开关动态构建（关闭 = 不含 '/recycle'，直达/残留路径落入 '*' 主页） */
export const homeRouterSwitch = (enableRecycleBin: boolean) => routerSwitch(getHomeRouter(enableRecycleBin));
