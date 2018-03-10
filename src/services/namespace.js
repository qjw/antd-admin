import {request, config} from 'utils'
import {createService} from "./common"

exports.services = createService(config.api.namespaces);