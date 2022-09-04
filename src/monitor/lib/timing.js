import tracker from '../utils/tracker';
import onload from '../utils/onload';

export function timing () {

  function innerTiming () {
    const {
      fetchStart,
      connectStart,
      connectEnd,
      requestStart,
      requestEnd,
      responseStart,
      responseEnd,
      domLoading,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      loadEventStart,
    } = performance.timing;

    const timingObj = {
      kind: 'experience', // 用户体验指标
      type: 'timing', // 统计每个阶段时间
      connectTime: connectEnd - connectStart,
      ttfbTime: responseStart - requestStart,
      responseTime: responseEnd - responseStart,
      parseDOMTime: loadEventStart - domLoading,
      domContentLoadedTime: domContentLoadedEventStart - domContentLoadedEventEnd,
      timeToInteractiveTime: domInteractive - fetchStart,
      loadTime: loadEventStart - fetchStart,
    }

    tracker.send(timingObj)
  }

  onload(function () {
    setTimeout(() => {
      innerTiming();
    }, 3000);
  })
}