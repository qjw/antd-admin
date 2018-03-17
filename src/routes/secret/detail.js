import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './detail.less'
import { Button,Row,Col,Collapse,Input,Modal} from 'antd'
import { config } from 'utils'
import {routerRedux} from 'dva/router'
import {buildUrl} from '../../utils/url'
import {resolveObject} from "../../utils"
import { Loader } from 'components'
const { route } = config;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
const { TextArea } = Input;

const pageKey = "secretDetail";
const Detail = ({ state, dispatch, loading }) => {
  const { data,translate } = state;
  const content = [];
  const panels = [];

  const translateMap = {
    "type": "类型",
    "apiVersion": "版本",
    "metadata.name": "名称",
    "metadata.namespace": "命名空间"
  };

  Object.keys(translateMap).forEach(function(key) {
    content.push(<div key={key} className={styles.item}>
      <div>{translateMap[key] || key}</div>
      <div>{resolveObject(data,key)}</div>
    </div>)
  });

  const onChange=((key)=>(content)=>{
      dispatch({
        type: `${pageKey}/querySuccess`,
        data: {
          "translate": {
             ...translate,
             [key]: content.target.value
          }
        },
      })
  })

  if(data["data"]) {
     Object.keys(data["data"]).forEach(function(key) {
        var body = data["data"][key]
        if (key in translate) {
            body = translate[key]
        }

        panels.push(
            <Panel header={key} key={key}>
              <TextArea autosize={true} value={body} onChange={onChange(key)} disabled={data["type"]!="Opaque"}/>
            </Panel>
        )
    })
  }

  function callback(key) {
     dispatch({
        type: `${pageKey}/decode`,
        payload: key,
     })
  }

  const showDeleteConfirm = () => {
      confirm({
        title: '删除',
        content: '是否删除Secret：' + data.metadata.name,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          dispatch({
              type: `${pageKey}/delete`,
          })
          dispatch(routerRedux.push({
            pathname: buildUrl(route.secrets,{namespace: data.metadata.namespace}),
          }))
        },
        onCancel() {
        },
      });
  }

  const onUpdate = () => {
      dispatch({
          type: `${pageKey}/update`,
      })
  }

  return (<div className="content-inner">
    <div className={styles.content}>
        <Loader fullScreen={false} spinning={loading.effects[pageKey + "/query"]} />
        <Row>
          <Col span={20}>{content}</Col>
          <Col span={4}>
            <Button.Group size="large" disabled>
              <Button type="primary" onClick={()=>{onUpdate()}}
                disabled={!state.ready}
              >更新</Button>
              <Button type="danger" onClick={()=>{showDeleteConfirm()}}
                disabled={!state.ready}
              >删除</Button>
            </Button.Group>
          </Col>
        </Row>

    </div>
    <br/>
    <Collapse onChange={callback}>
    {panels}
    </Collapse>
  </div>)
};

Detail.propTypes = {
};

export default connect(({ secretDetail, loading }) => ({ state:secretDetail, loading: loading }))(Detail)