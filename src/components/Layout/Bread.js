import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from 'utils'
import styles from './Bread.less'
import {parseUrl,buildUrl} from '../../utils/url'

const Bread = ({ menu, location }) => {
  // 匹配当前路由
  let pathArray = []
  let current;
  let match;
  for (let index in menu) {
    if (menu[index].route) {
      match = pathToRegexp(menu[index].route).exec(location.pathname);
      if(match){
        current = menu[index];
        break
      }
    }
  }

  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.pid) {
      getPathArray(queryArray(menu, item.pid, 'id'))
    }
  };

  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    });
    pathArray.push({
      id: 404,
      name: 'Not Found',
    })
  } else {
    getPathArray(current)
  }

  // 自动填充
  if(current){
    const urlDatas = parseUrl(location.pathname, current.route);
    pathArray.forEach(function (item) {
      if(item === current || !item.route) return;
      item.route2 = buildUrl(item.route,urlDatas)
    })
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
        ? <Icon type={item.icon} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key && "route" in item)
          ? <Link to={item.route2 || '#'}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
}

export default Bread