/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { pageModel } from '../common'
import queryString from 'query-string'
import {services} from '../../services/secret'
import pathToRegexp from 'path-to-regexp'

const { countPePage,route } = config;

export default modelExtend(pageModel, {
  namespace: 'secrets',

  state: {
    currentItem: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp(route.secrets).exec(location.pathname);
        if (match) {
          location.query = queryString.parse(location.search);
          var payload = location.query || { page: 1, count: countPePage };
          payload["namespace"] = match[1]
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const {data} = yield call(services.query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.items,
            pagination: {
              current: Number(data.page) || 1,
              pageSize: countPePage,
              total: data.total,
            },
          },
        })
      }
    }
  }
})
