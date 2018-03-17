import React from 'react'
import PropTypes from 'prop-types'
import {Table, List as AList, Tag, Modal} from 'antd'
import classnames from 'classnames'
import {DropOption} from 'components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import styles from './list.less'
import {routerRedux} from 'dva/router'
import {buildUrl} from '../../utils/url'
import { config } from 'utils'
const { route } = config;

const List = ({isMotion, location, dispatch, ...tableProps}) => {
  location.query = queryString.parse(location.search);

  const onContent = function(v) {
      Modal.success({
        content: v,
      });
  }

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch(routerRedux.push({
        pathname: buildUrl(route.secretDetail,{
            namespace: record.metadata.namespace,
            id: record.metadata.name
        }),
      }))
    }
  };

  const calcMenu = (record) => {
    const arr = [
      {key: '1', name: '详情'},
    ];
    return arr
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'metadata.name',
      key: 'name',
      render: (text, record) => <Link to={
        buildUrl(route.secretDetail,{namespace:record.metadata.namespace,id:record.metadata.name})
      }>{text}</Link>,
    },
    {
      title: '命名空间',
      dataIndex: 'metadata.namespace',
      key: 'namespace',
    },
    {
      title: '标签',
      dataIndex: 'metadata.labels',
      key: 'labels',
      render: (text, record) => {
        var data = []
        if(record.metadata.labels) {
            data = Object.keys(record.metadata.labels)
            return <AList
              size="small"
              split={false}
              dataSource={data}
              renderItem={item => (
                <AList.Item onClick={()=>onContent(record.metadata.labels[item])}><Tag>{item}</Tag></AList.Item>
              )}
            />
        }else{
            return <div/>
        }
      }
    },
    {
      title: '注解',
      dataIndex: 'metadata.annotations',
      key: 'annotations',
      render: (text, record) => {
        var data = []
        if(record.metadata.annotations) {
            data = Object.keys(record.metadata.annotations)
            return <AList
              size="small"
              split={false}
              dataSource={data}
              renderItem={item => (
                <AList.Item onClick={()=>onContent(record.metadata.annotations[item])}><Tag>{item}</Tag></AList.Item>
              )}
            />
        }else{
            return <div/>
        }
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 170,
    },
    {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (text, record) => {
        return <DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={calcMenu(record)}
        />
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({[styles.table]: true, [styles.motion]: isMotion})}
        bordered
        scroll={{x: 800}}
        columns={columns}
        simple
        rowKey={record => record.metadata.name}
      />
    </div>
  )
};

List.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List