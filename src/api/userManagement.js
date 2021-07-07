import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user',
    method: 'get',
    params: data,
  })
}

export function doEdit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data,
  })
}
