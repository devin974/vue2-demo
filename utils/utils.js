export function expToFunc (exp,scope) {
  return new Function('with(this){return '+exp+'}').bind(scope);
}
