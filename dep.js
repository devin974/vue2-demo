export default class Dep { 
  static target = null
  constructor() { 
    this.subs = new Set() // 此处用了set保证key是唯一的
  }
  //添加订阅者
  addSub (sub) {
    this.subs.add(sub)
  }

  //通知所有订阅者
  notify () { 
    for (const iterator of this.subs) {
      iterator.update() //调用所有订阅者的update事件
    }
  }
  //移除订阅者
  removeSubs () {
    this.subs.delete(sub);
  }
}
