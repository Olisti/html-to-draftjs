import { Map } from 'immutable'

export default function getBlockData(node: Object): Object {
  const data = {
    ...(node.style.textAlign && { 'text-align': node.style.textAlign }),
    ...(node.style.marginLeft && { 'margin-left': node.style.marginLeft }),
    ...(node.style.lineHeight && { 'line-height': node.style.lineHeight }),
  }
  return data ? new Map(data) : undefined
}
