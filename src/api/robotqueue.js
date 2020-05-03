import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

//查询大任务列表
export function search(params) {
  return request({
    url: '/robot/search',
    method: 'post',
    data: params
  })
}
