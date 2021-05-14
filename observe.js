import Dep from './dep.js'

let data = {text:'hello'}
 // 监听对象
function observe (data) {
  //确保data是一个对象
  if (Object.prototype.toString.call(data) === '[object Object]') { 
    for (const key in data) {
      defineReactive(data,key,data[key])
    }
  }
}

function defineReactive (obj, key, val) {
  const dep = new Dep() 
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 如果target指向了Watcher，就把这个Watcher添加到Dep
      // Dep的addSub是一个Set，所以不会把一个相同的Watcher添加多次
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set (newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify()
      observe(newVal); // 如果新的值是一个object的话 继续监听
    }
  });
  observe(val); // 递归监听对象的键值
}
export default {
  observe
}


