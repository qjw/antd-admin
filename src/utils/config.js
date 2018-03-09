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
  APIV1,
  api: {
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    menus: `${APIV1}/menus`,
  },
}
