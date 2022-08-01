import _ from 'lodash'
import { serialize } from 'object-to-formdata'
import qs from 'qs'

import getQuery from '../services/getQuery'

const useDataProvider = (apiUrl, httpClient, sendFormAsFormData) => {
  const getPath = (resource, id, action, query) => {
    const resourcePath = _.isFunction(resource)
      ? resource(id)
      : `${resource}${id ? '/' + id : ''}${action ? '/' + action : ''}`
    let path = `${apiUrl}${resourcePath}`
    const separator = path.indexOf('?') !== -1 ? '&' : '?'
    if (query)
      path += `${separator}${qs.stringify(query, {
        arrayFormat: 'brackets'
      })}`

    return path
  }

  const getList = (resource, queryParams) => {
    const { pagination, sort, filter, params } = queryParams
    const query = params ? params : getQuery({ pagination, sort, filter })

    return httpClient
      .get(getPath(resource, null, null, query))
      .then(({ headers, data: { records, pagination } }) => ({
        records,
        pagination
      }))
      .catch(error => error)
  }

  const create = (resource, data) =>
    httpClient.post(
      getPath(resource),
      sendFormAsFormData ? serialize({ record: data }) : { record: data }
    )

  const update = (resource, id, data) =>
    httpClient.put(
      getPath(resource, id),
      sendFormAsFormData ? serialize({ record: data }) : { record: data }
    )

  const customAction = (resource, id, action, method, data) =>
    httpClient({
      url: getPath(resource, id, action),
      method: method ? method : 'post',
      data: sendFormAsFormData ? serialize({ record: data }) : { record: data }
    })

  const _delete = (resource, id) =>
    httpClient
      .delete(getPath(resource, id))
      .then(({ headers, data }) => ({ data }))
      .catch(error => error)

  return {
    getList,
    create,
    update,
    customAction,
    delete: _delete
  }
}

export default useDataProvider
