import combineReducers from '../labs/combineReducers';
import createStore from '../labs/createStore';
import * as globalStore from './globalStateStore';
import * as locationStore from './locationStore';
import * as memoStore from './memoStore';
import * as userStore from './userStore';
import * as queryStore from './queryStore';
import * as dailyNotesStore from './dailyNotesStore';
import * as settingsStore from './settingsStore';

interface AppState {
  globalState: globalStore.State;
  locationState: locationStore.State;
  memoState: memoStore.State;
  userState: userStore.State;
  queryState: queryStore.State;
  dailyNotesState: dailyNotesStore.State;
  settingsState: settingsStore.State;
}

type AppStateActions =
  | globalStore.Actions
  | locationStore.Actions
  | memoStore.Actions
  | userStore.Actions
  | queryStore.Actions
  | dailyNotesStore.Actions
  | settingsStore.Actions;

const appStore = createStore<AppState, AppStateActions>(
  {
    globalState: globalStore.defaultState,
    locationState: locationStore.defaultState,
    memoState: memoStore.defaultState,
    userState: userStore.defaultState,
    queryState: queryStore.defaultState,
    dailyNotesState: dailyNotesStore.defaultState,
    settingsState: settingsStore.defaultState,
  },
  combineReducers<AppState, AppStateActions>({
    globalState: globalStore.reducer,
    locationState: locationStore.reducer,
    memoState: memoStore.reducer,
    userState: userStore.reducer,
    queryState: queryStore.reducer,
    dailyNotesState: dailyNotesStore.reducer,
    settingsState: settingsStore.reducer,
  }),
);

export default appStore;
