import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

//查询大任务列表
export function version(params) {
  return request({
    url: '/home/version',
    method: 'post',
    data: params
  })
}