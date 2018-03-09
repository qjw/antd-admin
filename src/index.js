import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createHashHistory'
import 'babel-polyfill'


let lastError = null;

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    if (lastError !== error.message) {
      message.error(error.message,3,(_) => lastError=null);
    }
    lastError = error.message
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
