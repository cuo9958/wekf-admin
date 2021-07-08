import request from '@/utils/request'
import { tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
