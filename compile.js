import wathcer from './watcher.js'
// 实现一个dom编译器 
// 第一步先要能够把双括号的内容获取成js的表达式 
// 第二步 拼好的字符串 转化成可执行代码 
// @example data.text=xxxx  {{data.text}}
function textToExp (text) {
  const regexp = /({{.+?}})/g
  let pieces = text.split(regexp);
  pieces = pieces.map(item => { 
    if (item.match(regexp)) {
      item = '(' + item.replace(/^{{|}}$/g, '') + ')'; //替换 {{ 或者 }}
    } else { 
      //非必须要替换的字符 需要包裹一层以字符串的形式输出
      item = '`'+ item.toString() +'`'
    }
    return item.trim()
  })
  return pieces.join('+')
}
// console.log(textToExp('you are `  {{ apple }} in my eyes !')); /// ====> [ 'you are  ', '{{ apple }}', ' in my eyes !' ]

//结合上面的第一步和第二步开始做词法解析
function compileText (node,scope) { 
  let exp = textToExp(node.textContent) // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent
  new wathcer(exp, scope, (newval) => { 
    node.textContent= newval
  })
}

function compile (el, scope) {
  console.log(el);
  // el.childNodes获取到的只是一个nodeList 需要转成Array
  [].slice.call(el.childNodes).forEach(node => { 
    // nodeType https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    if (node.nodeType === 1) { // ELEMENT_NODE
      compile(node,scope)
    } else if (node.nodeType === 3) { //TEXT_NODE
      compileText(node,scope)
    }
  })
}
export default {
  compile
}

