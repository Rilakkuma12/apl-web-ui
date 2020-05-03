import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

//获取当前系统配置主题
export function loadTopics(params) {
    return request({
      url: '/kafka/topic',
      method: 'post',
      data: params
    })
}

export function sendMessage(params) {
    return request({
      url: '/kafka/sendMessage',
      method: 'post',
      data: params
    })
}

export function searchReceive(params) {
  return request({
    url: '/kafka/searchReceive',
    method: 'post',
    data: params
  })
}

export function searchSend(params) {
  return request({
    url: '/kafka/searchSend',
    method: 'post',
    data: params
  })
}