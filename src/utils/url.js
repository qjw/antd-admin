import pathToRegexp from 'path-to-regexp'

module.exports = {
  buildUrl:(url, param) => {
    if(!param) return url;

    const toPath = pathToRegexp.compile(url);
    return toPath(param);
  },

  parseUrl:(url,route) => {
    const match = pathToRegexp(route).exec(url)
    if(!match) return {}

    let urlDatas = {};
    let index = 1;
    const keys = pathToRegexp.parse(route)
    keys.forEach(function(item){
      if(typeof item !== 'object'){
        return
      }
      urlDatas[item.name] = match[index]
      index ++
    });
    return urlDatas
  }
};
