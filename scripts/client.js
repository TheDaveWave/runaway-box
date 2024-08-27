// Vanilla JS solution to running functions on document ready.
document.addEventListener("DOMContentLoaded", (event) => onReady(event));

// Functions to run on Document load.
function onReady(event) {
  getDarkMode();
  const border = getDocumentBorder();
  console.log(`Document Border - x: ${border.docuWidth}, y: ${border.docuHeight}`);
  const box = document.getElementById("box-bounds");
  box.addEventListener("mouseenter", function (event) {
    moveBox(event);
  });
  box.addEventListener("touchmove", function (event) {
    moveBox(event);
  });
}

// Function to set the app's mode to the mode the user has selected: dark or light.
function getDarkMode() {
  setDarkMode();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({matches}) => {
    setDarkMode(matches);
  });
}

// Function to set the app's mode to the mode the user has selected: dark or light.
function setDarkMode(matches) {
  const isDarkMode = matches ?? window.matchMedia("(prefers-color-scheme: dark)").matches;
  if(isDarkMode) {
    document.body.classList.add('dark-mode');
    document.getElementById("runaway-box").classList.add('dark-box');
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById("runaway-box").classList.remove('dark-box');
  }
}

// gets the bounds of the page to keep the box from trailing off the page.
function getDocumentBorder() {
  // get the max width using math.max on every possible way to get the width to improve compatability with different browsers.
  const docX = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
  // get the max height.
  const docY = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
  return { docuWidth: docX, docuHeight: docY};
}

function getAngle(event) {
  // get the boundaries of the boundary box.
  const b = document.getElementById('box-bounds').getBoundingClientRect();
  // need to get the absolute center of the element.
  const x = b.left + b.width / 2;
  const y = b.top + b.height / 2;
  const radians = Math.atan2((y - event.pageY), (x - event.pageX));
  let angle = Math.round(radians * (180 / Math.PI));
  if(angle < 0) { angle = (angle + 360) % 360 }
  return angle;
}

// need to figure out how to use the angle to move the box in the opposite direction. Back to algebra class...
// function getMovementParams(element, event, pixels = 20) {
//   const angle = getAngle(event);
//   const radians = angle * (Math.PI / 180);
//   const deltaX = Math.round(Math.cos(radians) * pixels);
//   const deltaY = Math.round(Math.sin(radians) * pixels);
//   // const deltaLeft = Number(element.style.left.substring(0, element.style.left.indexOf("px"))) + deltaX;
//   // const deltaTop = Number(element.style.top.substring(0, element.style.top.indexOf("px"))) + deltaY;
//   const deltaLeft = Math.ceil((Number(element.style.left.substring(0, element.style.left.indexOf("%"))) + deltaX) / 100);
//   const deltaTop = Math.ceil((Number(element.style.top.substring(0, element.style.top.indexOf("%"))) + deltaY) / 100);
//   return {deltaLeft, deltaTop};
// }

function getMovementParams(element, event, percent = 2) {
  const angle = getAngle(event);
  const radians = angle * (Math.PI / 180);
  const deltaX = Math.round(Math.cos(radians) * percent);
  const deltaY = Math.round(Math.sin(radians) * percent);
  // const deltaLeft = Number(element.style.left.substring(0, element.style.left.indexOf("px"))) + deltaX;
  // const deltaTop = Number(element.style.top.substring(0, element.style.top.indexOf("px"))) + deltaY;
  const deltaLeft = Number(element.style.left.substring(0, element.style.left.indexOf("%"))) + deltaX;
  const deltaTop = Number(element.style.top.substring(0, element.style.top.indexOf("%"))) + deltaY;
  return {deltaLeft, deltaTop};
}

// move the box relative to which side the mouse is closest to it.
function moveBox(event) {
  // Trying to handle the mobile touch events.
  if(Array.isArray(event)) {
    event = event[0];
  }
  // get the boundaries of the boundary box.
  const el = document.getElementById('box-bounds');
  // get the document boundary.
  let boundary = getDocumentBorder();
  let elBounds = document.getElementById("box-bounds").getBoundingClientRect();
  let boxWidth = elBounds.width;
  let boxHeight = elBounds.height;
  // get the element's postion.
  let elPos = {
    top: Number(el.style.top.substring(0, el.style.top.indexOf("%"))),
    left: Number(el.style.left.substring(0, el.style.left.indexOf("%")))
  }
  // will need to get the position of the box and makes sure it does not go past (0,0), (0, max height), (max width, 0), (max width, max height).
  const boundaryHeight = 100 - Math.round((boxHeight / boundary.docuHeight) * 100);
  const bounaryWidth = 100 - Math.round((boxWidth / boundary.docuWidth) * 100);
  const positionCheck = elPos.top <= 0 || elPos.left <= 0 || elPos.top >= boundaryHeight || elPos.left >= bounaryWidth;
  if (positionCheck) {
    console.log("Hit Boundary", elPos);
    Object.assign(el.style, {left: "50%", top: "50%"});
  }
  // GET THIS TO RUN ON A FAKE COOKIE PREFERENCES BUTTON.
  const {deltaLeft, deltaTop} = getMovementParams(el, event);
  // Assign movement params to the element's style.
  const { pageX, pageY } = event;
  const {top, left, bottom, right} = elBounds;
  // if(pageX <= left || pageX <= right || pageY <= top || pageY <= bottom) {
    // Object.assign(el.style, {left: String(deltaLeft) +"px", top: String(deltaTop) +"px"});
  Object.assign(el.style, {left: String(deltaLeft) +"%", top: String(deltaTop) +"%"});
  // }
}
