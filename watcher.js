import Dep from './dep.js'
import { expToFunc } from './utils/utils.js'
export default class Watcher { 
  /**
   * 
   * @param {*} origin 原始表达式
   * @param {*} scope 数据源
   * @param {*} callback dom更新的函数
   */
  constructor(origin,scope,callback) {
        this.value = null; // 存放当前编译结果
        this.getValue = expToFunc(origin, scope); // 生成编译结果的函数
        this.callback = callback;
        this.update(); // 绑定时需要编译一次
  }
  get () { 
    Dep.target = this // 编译前把target指向当前Watcher实例
    let value = this.getValue() //这个编译过程中会触发关联的key的getter
    Dep.target = null  // 编译后把target重置
    return value
  }
  update () { 
    let newData = this.get()
    if (newData !== this.value) {
      this.value = newData
      this.callback && this.callback(newData)
    }
  }
}
