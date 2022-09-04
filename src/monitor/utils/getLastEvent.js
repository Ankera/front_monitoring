let lastEvent = null;
let eventTypes = [
  'click',
  'touchstart',
  'mousedown',
  'keydown',
  'mousemove'
];

eventTypes.forEach(eventType => {
  document.addEventListener(eventType, (event) => {
    lastEvent = event;
  }, {
    capture: true,
    passive: true
  })
})

export default function getLastEvent () {
  return lastEvent;
}

