export function disposeSrc(src, prefix) {
  Object.keys(src).forEach(key => {
    if (typeof src[key] === 'string') {
      src[key] = `${prefix}${src[key]}`
    } else {
      src[key] = disposeSrc(src[key], prefix)
    }
  })
  return src
}

export function disposeUrl(url, prefix) {
  Object.keys(url).forEach(key => {
    if ('url' in url[key]) {
      url[key]['url'] = `${prefix}${url[key]['url']}`
    } else {
      url[key] = disposeUrl(url[key], prefix)
    }
  })
  return url
}