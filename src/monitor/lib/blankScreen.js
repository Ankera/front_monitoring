import tracker from '../utils/tracker';
import getSelector from '../utils/getSelector';
import onload from '../utils/onload';

export function blankScreen () {

  const wrapperElements = ['html', 'body', 'div#container', 'div.content'];

  // 空白点标记
  let emptyPoints = 0;

  function isWrapper (element) {
    const selector = getSelector(element);
    const selectorArray = selector.split(' ');
    if (selectorArray.length <= wrapperElements.length) {
      emptyPoints++;
    }
  }

  onload(function () {
    for (let i = 1; i <= 9; i++) {
      const xElement = document.elementFromPoint(window.innerWidth / 10 * i, window.innerHeight / 2);
      const yElement = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 10 * i);

      isWrapper(xElement);
      isWrapper(yElement);
    }

    // 白屏检测，15 根据业务自定义
    if (emptyPoints >= 15) {
      const centerElement = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      tracker.send({
        kind: 'stability',
        type: 'blank',
        emptyPoints,
        screen: window.screen.width + "X" + window.screen.height,
        viewPoint: window.innerWidth + "X" + window.innerHeight,
        selector: getSelector(centerElement)
      })
    }
  })
}