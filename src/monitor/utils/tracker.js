const userAgent = require('user-agent');
/**
 * 
 */

const project = 'sls-log-test-01';
const host = 'cn-hangzhou.log.aliyuncs.com';
const logStoreName = 'sls-log-test-01';

function getEextraData () {
  return {
    title: document.title,
    url: location.url,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name
  }
}

class SendTracker {
  constructor() {
    // 上报的路径
    this.url = `http://${project}.${host}/logstores/${logStoreName}/track`;
    this.xhr = new XMLHttpRequest();
  }

  send (data = {}) {
    let extraData = getEextraData();

    this.xhr.open('POST', this.url, true);
    const log = { ...data, ...extraData };

    for (const key in log) {
      if (typeof log[key] === 'number') {
        log[key] = `${log[key]}`;
      }
    }

    const body = JSON.stringify(log);

    this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
    this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
    this.xhr.setRequestHeader('Content-Type', 'application/json');

    this.xhr.onload = function () {
      console.log('ssss', this.xhr.response);
    }

    this.xhr.onerror = function (error) {
      console.log('error', error);
    }


    this.xhr.send(JSON.stringify({
      __logs__: [log]
    }));
  }

}

export default new SendTracker();