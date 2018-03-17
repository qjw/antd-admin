const APIV1 = '/api/v1'

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  apiPrefix: '/api/v1',
  indexPage: "/namespaces",
  countPePage: 10,
  APIV1,
  api: {
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    menus: `${APIV1}/menus`,
    namespaces: {
      "query": `${APIV1}/namespaces/`,
    },
    secrets: {
      "query": `${APIV1}/secrets/:namespace`,
      "detail": `${APIV1}/secrets/:namespace/:id`,
      "update": `${APIV1}/secrets/:namespace/:id`,
      "remove": `${APIV1}/secrets/:namespace/:id`,
      "decode": `${APIV1}/base64`,
    }
  },
  route: {
    namespaces: "/namespaces",
    secrets: "/secrets/:namespace",
    secretDetail: "/secrets/:namespace/detail/:id",
  }

}
