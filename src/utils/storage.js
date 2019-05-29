import { message } from 'ant-design-vue'

class Storage {
  constructor (name) {
    this.name = 'storage'
  }
  setItem (params) {
    let obj = {
      name: '',
      value: '',
      localStorage: null,
      expires: '',
      startTime: new Date().getTime()// 记录何时将值存入缓存，毫秒级
    }
    let options = {}
    Object.assign(options, obj, params)
    let storageMethod = options.localStorage ? localStorage : sessionStorage
    if (options.expires) {
      storageMethod.setItem(options.name, JSON.stringify(options))
    } else {
      let type = Object.prototype.toString.call(options.value)
      if (type === '[object Object]') {
        options.value = JSON.stringify(options.value)
      }
      if (type === '[object Array]') {
        options.value = JSON.stringify(options.value)
      }
      storageMethod.setItem(options.name, options.value)
    }
  }
  getItem (name, method) {
    let storageMethod = method ? localStorage : sessionStorage
    let item = storageMethod.getItem(name)
    try {
      item = JSON.parse(item)
    } catch (error) {
      item = storageMethod.getItem(name)
    }
    if (item && item.startTime) {
      let date = new Date().getTime()
      if (date - item.startTime > item.expires) {
        storageMethod.removeItem(name)
        message.error(i18n.t('tip.time_out_login'))
        return false
      } else {
        return item.value
      }
    } else {
      return item
    }
  }
  // 移出缓存
  removeItem (name, method) {
    let storageMethod = method ? localStorage : sessionStorage
    storageMethod.removeItem(name)
  }
  // 移出全部缓存
  clear (method) {
    let storageMethod = method ? localStorage : sessionStorage
    storageMethod.clear()
  }
}

export default Storage
