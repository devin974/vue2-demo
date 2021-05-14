import compile from './compile.js'
import observe from './observe.js'
function proxy (vm, options) {
  for (const key in options.data) {
    Reflect.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get () { 
        return vm.$data[key]
      },
      set (newval) { 
        vm.$data[key] = newval
      }
    })
  }
}

export default class Vue{
  constructor(options) { 
    this.$options = options
    this.$data = options.data
    this.$el = document.querySelector(options.el)
    observe.observe(this.$data);
    proxy(this,options)
    compile.compile(this.$el, this.$data);
  }
}