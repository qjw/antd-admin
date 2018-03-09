const { config } = require('./common')

const { apiPrefix } = config
let database = {
    "code": 0,
    "data": [
        {
            "id": 1,
            "redirect": "/user",
            "name": "Users",
            "icon": "user"
        },
        {
            "id": 2,
            "name": "User Detail",
            "icon": "user",
            "route": "/user/:id",
            "pid": 1,
            "mpid": -1
        }
    ],
    "message": "ok"
}

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
