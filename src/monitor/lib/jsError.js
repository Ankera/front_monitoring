import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker';

export function injectJsError () {
  window.addEventListener('error', function (event) {
    // 最后一个事件源
    const lastEvent = getLastEvent() || {};

    const log = {
      kind: 'stability',
      type: 'error',
      errorType: 'jsError',
      url: '',
      message: event.message,
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : null,
    };

    // console.log('log', log)

    tracker.send(log);
  })

  function getLines (stack) {
    if (typeof stack === 'string') {
      // \s 空白符
      return stack.split('\n').slice(1).map((item) => item.replace(/^\s+at\s+/g, "")).join("^");
    }
    return stack;
  }
}