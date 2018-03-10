import React from 'react'
import PropTypes from 'prop-types'
import {Table, List as AList, Tag, Modal} from 'antd'
import classnames from 'classnames'
import {DropOption} from 'components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import styles from './list.less'

const List = ({isMotion, location, ...tableProps}) => {
  location.query = queryString.parse(location.search);

  const onContent = function(v) {
      Modal.success({
        content: v,
      });
  }

  const handleMenuClick = (record, e) => {
//    if (e.key === '1') {
//      onEditItem(record)
//    }else if (e.key === '2') {
//      onDeleteItem(record)
//    }
  };

  const calcMenu = (record) => {
    const arr = [
      {key: '1', name: '编辑'},
      {key: '2', name: '删除'},
    ];
    return arr
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'metadata.name',
      key: 'name',
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
      title: '创建时间',
      dataIndex: 'metadata.creationTimestamp',
      key: 'creationTimestamp',
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