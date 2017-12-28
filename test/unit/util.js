import Vue from 'vue'
import iView from 'iview'

Vue.use(iView)

let id = 0

const createElm = function () {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

/**
 * destroy vm
 * @param  {Object} vm
 */
exports.destroyVM = function (vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * Create a Vue instance object
 * @param  {Object|String}  Compo  - Component config, can directly send template
 * @param  {Boolean=false} mounted - mounted DOM
 * @return {Object} vm
 */
exports.createVue = function (Compo, mounted = false) {
  const elm = createElm()

  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo }
  }
  return new Vue(Compo).$mount(mounted === false ? null : elm)
}

/**
 * Create a test component instance
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - component object
 * @param  {Object}  propsData      - props data
 * @param  {Boolean=false} mounted  - mounted DOM
 * @return {Object} vm
 */
exports.createTest = function (Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  const elm = createElm()
  const Ctor = Vue.extend(Compo)
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm)
}

/**
 * Transform Date string (yyyy-mm-dd hh:mm:ss) to Date object
 * @param {String}
 */
exports.stringToDate = function (str) {
  const parts = str.split(/[^\d]/).filter(Boolean)
  parts[1] = parts[1] - 1
  return new Date(...parts)
}

/**
 * Transform Date to yyyy-mm-dd string
 * @param {Date}
 */
exports.dateToString = function (d) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(nr => nr > 9 ? nr : '0' + nr).join('-')
}

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function (elm, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

/**
* Wait for components inner async process, when this.$nextTick is not enough
* @param {Function} the condition to verify before calling the callback
* @param {Function} the callback to call when condition is true
*/
exports.waitForIt = function waitForIt (condition, callback) {
  if (condition()) callback()
  else setTimeout(() => waitForIt(condition, callback), 50)
}

/**
* Call a components .$nextTick in a promissified way
* @param {Vue Component} the component to work with
*/
exports.promissedTick = component => {
  return new Promise((resolve, reject) => {
    component.$nextTick(resolve)
  })
}
