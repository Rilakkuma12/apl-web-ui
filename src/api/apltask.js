import request from '@/utils/request'
import { getLanguage } from '@/lang/index'

//查询大任务列表
export function search(params) {
  return request({
    url: '/task/search',
    method: 'post',
    data: params
  })
}

//导出
export function exportXls(params) {
  var locale = getLanguage() === 'zh' ? 'zh-cn' : 'en-us'
  return request({
    url: `/task/export/${locale}`,
    method: 'post',
    data: params
  })
}

//查询任务细节
export function searchDetails(params) {
  return request({
    url: '/task/details',
    method: 'post',
    data: params
  })
}

//获取当前设备的最新任务
export function searchDetailsById(params) {
  return request({
    url: '/task/detailsById',
    method: 'post',
    data: params
  })
}


//上料
export function loadConsumable(params) {
    return request({
      url: '/task/loadCosumable',
      method: 'post',
      data: params
    })
  }
//下料
export function quitConsumable(params) {
    return request({
      url: '/task/quitCosumable',
      method: 'post',
      data: params
    })
  }

//转移
export function moveConsumable(params) {
    return request({
      url: '/task/moveConsumable',
      method: 'post',
      data: params
    })
  }
  //定量
  export function quant(params) {
    return request({
      url: '/task/quant',
      method: 'post',
      data: params
    })
  }
  //实验
  export function experiment(params) {
    return request({
      url: '/task/experiment',
      method: 'post',
      data: params
    })
  }
//继续当前任务
  export function continueTask(params) {
    return request({
      url: '/task/continue',
      method: 'post',
      data: params
    })
  }
//清理当前任务
  export function clearTask(params) {
    return request({
      url: '/task/clear',
      method: 'post',
      data: params
    })
  }
//清理所有任务
  export function clearAllTask(params) {
    return request({
      url: '/task/clearall',
      method: 'post',
      data: params
    })
  }
  //清理超时任务
  export function clearTimeOut(params) {
    return request({
      url: '/task/cleartimeout',
      method: 'post',
      data: params
    })
  }
  
  export function clearTimeoutById(params) {
    return request({
      url: '/task/clearTimeoutById',
      method: 'post',
      data: params
    })
  }

  //运行
  export function testRun(params) {
    return request({
      url: '/task/run',
      method: 'post',
      data: params
    })
  }

  //停止
  export function testStop(params) {
    return request({
      url: '/task/stop',
      method: 'post',
      data: params
    })
  }
 //同步同步设备上线信息
  export function synchronize(params) {
    return request({
      url: '/task/synchronize',
      method: 'post',
      data: params
    })
  }
  
  export function clearCache(params) {
    return request({
      url: '/task/cleanCache',
      method: 'post',
      data: params
    })
  }

  //查询任务询问细节信息
export function getAcquire(params) {
  return request({
    url: '/task/acquire',
    method: 'post',
    data: params
  })
}

//查询任务步骤细节信息
export function searchStep(params) {
  return request({
    url: '/step/search',
    method: 'post',
    data: params
  })
}

export function ContinueTaskbyCode(params) {
  return request({
    url: '/step/continue',
    method: 'post',
    data: params
  })
}

export function SearchCommand(params) {
  return request({
    url: '/step/searchCommand',
    method: 'post',
    data: params
  })
}

export function Abortcmd(params) {
  return request({
    url: '/step/abortcmd',
    method: 'post',
    data: params
  })
}

export function Ignorecmd(params) {
  return request({
    url: '/step/ignorecmd',
    method: 'post',
    data: params
  })
}