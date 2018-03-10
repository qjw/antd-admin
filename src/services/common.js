import {request, config} from 'utils'
import {buildUrl} from '../utils/url'

export function createService(keys) {
  let res = {};
  let exclude = {}
  if (keys["create"]) {
    res["create"] =
      async function create(data, param=null) {
        return request({
          url: buildUrl(keys.create, param),
          method: 'post',
          data,
        })
      }
    exclude["create"] = null
  }

  if (keys["query"]) {
    res["query"] =
      async function query(data, param=null) {
        return request({
          url: buildUrl(keys.query, param),
          method: 'get',
          data,
        })
      }
    exclude["query"] = null
  }

  if (keys["detail"]) {
    res["detail"] =
      async function detail(param = null) {
        return request({
          url: buildUrl(keys.detail, param),
          method: 'get',
        })
      }
    exclude["detail"] = null
  }

  if (keys["update"]) {
    res["update"] =
      async function update(data, param=null) {
        return request({
          url: buildUrl(keys.update, param),
          method: 'put',
          data: data,
        })
      }
    exclude["update"] = null
  }

  if (keys["enable"]) {
    res["enable"] =
      async function enable(param = null) {
        return request({
          url: buildUrl(keys.enable, param),
          method: 'post',
        })
      }
    exclude["enable"] = null
  }

  if (keys["disable"]) {
    res["disable"] =
      async function disable(param = null) {
        return request({
          url: buildUrl(keys.disable, param),
          method: 'post',
        })
      }
    exclude["disable"] = null
  }

  if (keys["remove"]) {
    res["remove"] =
      async function remove(param = null) {
        return request({
          url: buildUrl(keys.remove, param),
          method: 'delete',
        })
      }
    exclude["remove"] = null
  }

  const methods = {
    "post": null,
    "put": null,
    "get": null,
    "delete": null,
    "patch": null,
  }

  for (const key in keys) {
    if (keys.hasOwnProperty(key)){
      // 排除上面的通用方法
      if(key in exclude) continue
      // 必须是对象
      if(typeof keys[key] === 'object'){
        const rt = keys[key]
        // 合法的方法
        if(!rt.method in methods) {
          continue
        }

        res[key] =
          async function create(data, param=null) {
            return request({
              url: buildUrl(rt.url, param),
              method: rt.method,
              data,
            })
          }
      }
    }
  }

  return res
}
