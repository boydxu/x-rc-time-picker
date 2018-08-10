export default {
  throttle(method, delay = 300, duration = 300) {
    let timer = null
    let begin = new Date()
    return function () {
      let context = this
      let args = arguments
      let current = new Date()
      clearTimeout(timer)
      if (current - begin >= duration) {
        method.apply(context, args)
        begin = current
      } else {
        timer = setTimeout(function () {
          method.apply(context, args)
        }, delay)
      }
    }
  },
}