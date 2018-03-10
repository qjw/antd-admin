import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import List from './list'

const pageKey = "namespaces";
const User = ({location, dispatch, state, loading}) => {
  location.query = queryString.parse(location.search);
  const {list, pagination} = state;
  const {count} = pagination;

  const listProps = {
    dataSource: list,
    loading: loading.effects[`${pageKey}/query`],
    pagination: false,
    location
  }

  return (
    <Page inner>
      <List {...listProps} />
    </Page>
  )
}

User.propTypes = {
  state: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({namespaces, loading}) => ({state: namespaces, loading}))(User)