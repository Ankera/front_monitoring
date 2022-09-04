import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker';

export function injectJsError () {
  window.addEventListener('error', (event) => {
    // 最后一个事件源
    const lastEvent = getLastEvent() || {};
    if (event.target && (event.target.src || event.target.href)) {
      tracker.send({
        kind: 'stability',
        type: 'error',
        errorType: 'resourceError',
        tagName: event.target.tagName,
        filename: event.target.src || event.target.href,
        selector: getSelector(event.target)
      })
    } else {
      tracker.send({
        kind: 'stability',
        type: 'error',
        errorType: 'jsError',
        url: '',
        message: event.message,
        filename: event.filename,
        position: `${event.lineno}:${event.colno}`,
        stack: getLines(event.error.stack),
        selector: lastEvent ? getSelector(lastEvent.path) : null,
      })
    }
  }, true)

  window.addEventListener('unhandledrejection', (event) => {
    const lastEvent = getLastEvent() || {};
    let message = '';
    let filename = '';
    let line = 0;
    let column = 0;
    let stack = '';
    if (typeof event.reason === 'string') {
      message = event.reason;
    } else if (typeof event.reason === 'object') {
      if (event.reason.stack) {
        const matchResult = event.reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
      }
      stack = getLines(event.reason.stack);
      message = event.reason.message;
    }
    const log = {
      kind: 'stability',
      type: 'error',
      errorType: 'promiseError',
      url: '',
      message,
      filename,
      position: `${line}:${column}`,
      stack,
      selector: lastEvent ? getSelector(lastEvent.path) : null,
    }

    tracker.send(log);
  }, true);



  function getLines (stack) {
    if (typeof stack === 'string') {
      // \s 空白符
      return stack.split('\n').slice(1).map((item) => item.replace(/^\s+at\s+/g, "")).join("^");
    }
    return stack;
  }
}