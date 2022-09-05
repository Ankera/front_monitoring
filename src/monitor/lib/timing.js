import tracker from '../utils/tracker';
import onload from '../utils/onload';
import getSelector from '../utils/getSelector';
import getLastEvent from '../utils/getLastEvent';

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
      domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
      timeToInteractiveTime: domInteractive - fetchStart,
      loadTime: loadEventStart - fetchStart,
    }

    tracker.send(timingObj)
  }

  let FMP, LCP;

  // 增加一个性能条目观察者
  new PerformanceObserver((entryList, observer) => {
    const perfEntry = entryList.getEntries();
    FMP = perfEntry[0];
    observer.disconnect();
  }).observe({ entryTypes: ['element'] }); // 观察页面中有意义的元素

  new PerformanceObserver((entryList, observer) => {
    const perfEntry = entryList.getEntries();
    LCP = perfEntry[0];
    observer.disconnect();
  }).observe({ entryTypes: ['largest-contentful-paint'] }); // 观察页面中有意义的元素

  new PerformanceObserver((entryList, observer) => {
    const lastEvent = getLastEvent() || {};
    const firstInput = entryList.getEntries()[0];
    console.log('firstInput', firstInput)
    if (firstInput) {
      /**
       * processingStart 开始处理时间， startTime 开始点击的时间， 差值就是处理的时间
       * 比如  我打你一下，
       * 差值就是处理的时间 = 我开始动手打你，到你刚反应过来的时间差不多
       */
      const inputDelay = firstInput.processingStart - firstInput.startTime;

      /**
       * 比如  我打你一下，
       * 我开始打你，到你刚反应过来的  开始时间， 持续到你喊疼结束时间
       */
      const duration = firstInput.duration;

      tracker.send({
        kind: 'experience', // 用户体验指标
        type: 'firstInputDelay', // 统计每个阶段时间
        inputDelay,
        duration,
        startTime: firstInput.startTime,
        selector: lastEvent ? getSelector(lastEvent.path) : null,
      })
    }
    observer.disconnect();
  }).observe({ type: 'first-input', buffered: true }); // 用户第一次交互

  onload(function () {
    setTimeout(() => {
      const FP = performance.getEntriesByName('first-paint')[0];
      const FCP = performance.getEntriesByName('first-contentful-paint')[0];

      console.log('FP', FP)
      console.log('FCP', FCP)
      console.log('FMP', FMP)
      console.log('LCP', LCP)
      tracker.send({
        kind: 'experience', // 用户体验指标
        type: 'paint', // 统计每个阶段时间
        FP: (FP || {}).startTime,
        FCP: (FCP || {}).startTime,
        FMP: (FMP || {}).startTime,
        LCP: (LCP || {}).startTime,
      })

      innerTiming();
    }, 3000);
  })
}