// import userService from "./userService";
import appStore from '../stores/appStore';
import { findQuery } from '../obComponents/obGetQueries';
import { deleteQueryForever } from '../obComponents/obDeleteQuery';
import { createObsidianQuery } from '../obComponents/obCreateQuery';
import { updateObsidianQuery } from '../obComponents/obUpdateQuery';
import { pinQueryInFile, unpinQueryInFile } from '../obComponents/obPinQuery';

class QueryService {
  public getState() {
    return appStore.getState().queryState;
  }

  public async getMyAllQueries() {
    // if (!userService.getState().user) {
    //   return false;
    // }

    // const { data } = await api.getMyQueries();
    // appStore.dispatch({
    //   type: "SET_QUERIES",
    //   payload: {
    //     queries: data,
    //   },
    // });
    const data = await findQuery();
    appStore.dispatch({
      type: 'SET_QUERIES',
      payload: {
        queries: data,
      },
    });
    return data;
  }

  public getQueryById(id: string) {
    for (const q of this.getState().queries) {
      if (q.id === id) {
        return q;
      }
    }
  }

  public pushQuery(query: Model.Query) {
    appStore.dispatch({
      type: 'INSERT_QUERY',
      payload: {
        query: {
          ...query,
        },
      },
    });
  }

  public editQuery(query: Model.Query) {
    appStore.dispatch({
      type: 'UPDATE_QUERY',
      payload: query,
    });
  }

  public async deleteQuery(queryId: string) {
    await deleteQueryForever(queryId);
    appStore.dispatch({
      type: 'DELETE_QUERY_BY_ID',
      payload: {
        id: queryId,
      },
    });
  }

  public async createQuery(title: string, querystring: string) {
    const data = await createObsidianQuery(title, querystring);
    return data;
  }

  public async updateQuery(queryId: string, title: string, querystring: string) {
    const data = await updateObsidianQuery(queryId, title, querystring);
    return data;
  }

  public async pinQuery(queryId: string) {
    await pinQueryInFile(queryId);
  }

  public async unpinQuery(queryId: string) {
    await unpinQueryInFile(queryId);
  }
}

const queryService = new QueryService();

export default queryService;
