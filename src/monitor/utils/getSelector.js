
function getSelector (path) {
  return path.reverse().filter(element => {
    return element !== document && element !== window
  }).map(element => {
    if (element.id) {
      return `${element.nodeName.toLowerCase()}#${element.id}`
    } else if (element.className && typeof element.className === 'string') {
      return element.nodeName.toLowerCase() + "." + element.className.split(' ').filter(item => !!item).join('.');
    }
    return element.nodeName.toLowerCase();
  }).join(' ');
}

export default function (pathOrTarget) {
  if (Array.isArray(pathOrTarget)) {
    return getSelector(pathOrTarget);
  } else if (typeof pathOrTarget === 'object') {
    const paths = [];
    while (pathOrTarget) {
      paths.push(pathOrTarget);
      pathOrTarget = pathOrTarget.parentNode;
    }
    return getSelector(paths);
  }
}