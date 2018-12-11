import { notification } from 'ant-design-vue'
class MiddleWare {
  constructor () {
    this.fnList = [this.product, this.vote]
  }
  product (res) {
    const url = res.request.responseURL
    const reg = /\/api\/delegates\/get/
    if (reg.test(url)) {
      return true
    } else {
      return false
    }
  }
  vote (res) {
    const url = res.request.responseURL
    const reg = /\/api\/accounts\/delegates/
    if (reg.test(url)) {
      return true
    } else {
      return false
    }
  }
  list (res) {
    let handled = false
    for (let i = 0; i < this.fnList.length; i++) {
      handled = this.fnList[i](res)
      if (handled) {
        break
      }
    }
    if (!handled) {
      let code = res.data
      if (code.success) {
        return res
      } else {
        notification.error({
          message: '提示',
          description: code.error
        })
      }
    }

    return res
  }
}
const middleWare = new MiddleWare()

export default middleWare
