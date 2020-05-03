import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

export function getHotelByArea(params) {
  return request({
    url:'/device/hotelDeviceByArea',
    method: 'post',
    data: params
  })
}

export function searchRack(params) {
    return request({
      url:'/hotel/searchRack',
      method: 'post',
      data: params
    })
  }

export function searchHotelData(params) {
  return request({
    url:'/hotel/searchHotelData',
    method: 'post',
    data: params
  })
}

export function openDoor(params) {
  return request({
    url:'/hotel/openDoor',
    method: 'post',
    data: params
  })
}

export function closeDoor(params) {
  return request({
    url:'/hotel/closeDoor',
    method: 'post',
    data: params
  })
}

export function scanRack(params) {
  return request({
    url:'/hotel/scanRack',
    method: 'post',
    data: params
  })
}

export function release(params) {
  return request({
    url:'/hotel/release',
    method: 'post',
    data: params
  })
}

export function rollRack(params) {
  return request({
    url:'/hotel/rollRack',
    method: 'post',
    data: params
  })
}

export function store(params) {
  return request({
    url:'/hotel/store',
    method: 'post',
    data: params
  })
}


