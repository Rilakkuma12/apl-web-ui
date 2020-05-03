import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

export function search(params) {
  return request({
    url: '/InteractiveHotel/search',
    method: 'post',
    data: params
  })
}

export function exportXls(params) {
  var locale = getLanguage() === 'zh' ? 'zh-cn' : 'en-us'
  return request({
    url: `/InteractiveHotel/export/${locale}`,
    method: 'post',
    data: params
  })
}

export function del(id) {
    return request({
      url: '/InteractiveHotel/' + id,
      method: 'delete'
    })
  }
  