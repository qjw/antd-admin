import {services} from '../../services/secret'
import {route} from '../../utils/config'
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'secretDetail',

  state: {
    data: {},
    translate:{},
    ready: false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp(route.secretDetail).exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { namespace: match[1],id: match[2] } })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const {data} = yield call(services.detail, payload)
      yield put({
        type: 'querySuccess',
        data: {
          data,
          ...{"ready": true},
        },
      })
    },

    * delete({payload}, {call, put, select}) {
      const {data} = yield select(_ => _.secretDetail)
      yield call(services.remove, {id: data.metadata.name,namespace: data.metadata.namespace});
    },

    * update({}, {call, put, select}) {

      const {data,translate} = yield select(_ => _.secretDetail)
      if(Object.keys(translate).length == 0) return

      yield put({
        type: 'querySuccess',
        data: {
          "ready": false,
        },
      })
      yield call(services.update, {
        id: data.metadata.name,
        namespace: data.metadata.namespace,
        data: translate
      });
      yield put({
        type: 'query',
        payload: {
          id: data.metadata.name,
          namespace: data.metadata.namespace,
        } ,
      })
    },

    * decode ({
      payload,
    }, { call, put, select }) {
      const {translate,data} = yield select(_ => _.secretDetail)
      if(!data.data) return
      if(payload.length < 1) return

      var key = null
      for (var item in payload) {
        if(payload[item] in translate) {
           continue
        }
        key = payload[item]
        break
      }
      if(!key) return

      yield put({
        type: 'querySuccess',
        data: {
          "ready": false,
        },
      })
      const res = yield call(services.decode, {"data":data.data[key]})
      yield put({
        type: 'querySuccess',
        data: {
          "translate": {
             ...translate,
             [key]: res.data
          },
          "ready": true,
        },
      })
    },
  },


  reducers: {
    querySuccess (state, { data }) {
      return {
        ...state,
        ...data,
      }
    },
  },
}