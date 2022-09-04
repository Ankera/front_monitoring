import tracker from '../utils/tracker';

export function injectXHR () {
  const XHLHttpRequest = window.XMLHttpRequest;
  const oldOpen = XHLHttpRequest.prototype.open;
  const oldSend = XHLHttpRequest.prototype.send;


  XHLHttpRequest.prototype.open = function (method, url, async) {
    if (!url.match(/logstores/)) {
      this.logData = {
        method,
        url,
        async
      }
    }

    return oldOpen.apply(this, arguments);
  }

  XHLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      let startTime = Date.now();

      const handler = (type) => {
        return () => {
          const duration = Date.now() - startTime;
          const status = this.status;
          const statusText = this.statusText;

          tracker.send({
            kind: 'stability',
            type: 'xhr',
            eventType: type,
            pathname: this.logData.url,
            status: `${status}-${statusText}`,
            duration,
            response: this.response ? JSON.stringify(this.response) : '',
            params: body || '',
          })
        }
      }

      this.addEventListener('load', handler('load'), false);
      this.addEventListener('error', handler('error'), false);
      this.addEventListener('abort', handler('abort'), false);
    }
    return oldSend.apply(this, arguments);
  }
}