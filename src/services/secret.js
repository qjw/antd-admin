import {request, config} from 'utils'
import {createService} from "./common"

let routes = config.api.secrets
if(typeof routes["decode"] != 'object'){
  routes['decode'] = {
    "method": "post",
    "url": routes['decode']
  }
}

exports.services = createService(routes);