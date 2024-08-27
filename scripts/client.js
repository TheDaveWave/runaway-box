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

  // // temporary listener to log the angle of the mouse relative to the box.
  // document.addEventListener("mousemove", function (event) {
  //   // console.log("ANGLE:::", getAngle(event));
  //   let b = document.getElementById('runaway-box');
  //   b.innerText = getAngle(event) + " deg"
  // });
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

// will need to get the position of the box and makes sure it does not
// go past (0,0), (0, max height), (max width, 0), (max width, max height).

// gets the bounds of the page to keep the box from trailing off the page.
function getDocumentBorder() {
  // get the max width using math.max on every possible way to get the width to improve compatability with different browsers.
  let docX = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
  // get the max height.
  let docY = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
  return { docuWidth: docX, docuHeight: docY};
}

function getAngle(event) {
  // get the boundaries of the boundary box.
  const b = document.getElementById('box-bounds').getBoundingClientRect();
  // need to get the absolute center of the element.
  const x = b.left + b.width / 2;
  const y = b.top + b.height / 2;
  const radians = Math.atan2((y - event.pageY), (x - event.pageX));
  let degree = Math.round(radians * (180 / Math.PI));
  if(degree < 0) { degree = (degree + 360) % 360 }
  return degree;
}

function getCartesianCoords(degrees, num) {
  return {x: Math.round(num * Math.cos(degrees)), y: Math.round(num * Math.sin(degrees))};
}

function getDeltaCoords(degrees) {
  const oppositeAngle = (degrees + 180) % 360;
  // const radians = oppositeAngle * (Math.PI / 180);
  const radians = degrees * (Math.PI / 180);
  return {deltaX: Math.round(Math.cos(radians) * 20), deltaY: Math.round(Math.sin(radians) * 20)};
}

// move the box relative to which side the mouse is closest to it.
function moveBox(event) {
  // Trying to handle the mobile touch events.
  if(Array.isArray(event)) {
    event = event[0];
  }

  // get the boundaries of the boundary box.
  let el = document.getElementById('box-bounds');

  const degrees = getAngle(event);

  // 45 degrees is top left of box, so 135 is top right
  // need to figure out how to use the angle to move the box in the opposite direction. Back to algebra class...
  // GET THIS TO RUN ON A FAKE COOKIE PREFERENCES BUTTON.

  const {deltaX, deltaY} = getDeltaCoords(degrees);
  const x = Number(el.style.left.substring(0, el.style.left.indexOf("px"))) + deltaX;
  const y = Number(el.style.top.substring(0, el.style.top.indexOf("px"))) + deltaY;
  console.log(x, y);

  Object.assign(el.style, {top: String(y) +"px", left: String(x) +"px"});
  console.log(getDeltaCoords(degrees));

  // // LEFT
  // if((degrees >= 315 && degrees < 360) || (degrees >= 0 && degrees < 45)) {
  //   const {x, y} = getCartesianCoords(degrees, 15);
  //   console.log(x, y);
  //   el.style.setProperty("left", String(event.pageX + 15) +"px");
  //   // Object.assign(el.style, {top: String(event.pageY + Math.abs(y)) +"px", left: String(event.pageX + Math.abs(x)) +"px"});
  // }
  // // RIGHT
  // if(degrees >= 135 && degrees < 225) {
  //   const {x, y} = getCartesianCoords(degrees, 30);
  //   console.log(x, y);
  //   el.style.setProperty("left", String(event.pageX - width - 30) +"px");
  //   // Object.assign(el.style, {top: String(event.pageY + Math.abs(y)) +"px", left: String(event.pageX + Math.abs(x)) +"px"});
  // }
  // // TOP
  // if(degrees >= 45 && degrees < 135) {
  //   const {x, y} = getCartesianCoords(degrees, 15);
  //   console.log(x, y);
  //   el.style.setProperty("top", String(event.pageY + 15) +"px");
  //   // Object.assign(el.style, {top:  String(event.pageY - height - Math.abs(y)) +"px", left: String(event.pageX - width - Math.abs(x)) +"px"});
  // }
  // // BOTTOM
  // if(degrees >= 225 && degrees < 315) {
  //   const {x, y} = getCartesianCoords(degrees, 30);
  //   console.log(x, y);
  //   el.style.setProperty("top", String(event.pageY - height - 30) +"px");
  //   // Object.assign(el.style, {top:  String(event.pageY - height - Math.abs(y)) +"px", left: String(event.pageX - width - Math.abs(x)) +"px"});
  // }

  // get the document boundary.
  let boundary = getDocumentBorder();
  let elBounds = document.getElementById("box-bounds").getBoundingClientRect();

  let boxWidth = elBounds.width;
  let boxHeight = elBounds.height;

  // get the element's postion.
  let elPos = {
    top: Number(el.style.top.substring(0, el.style.top.indexOf("px"))),
    left: Number(el.style.left.substring(0, el.style.left.indexOf("px")))
  }

  const positionCheck = elPos.top <= 0 || elPos.left <= 0 || elPos.top >= boundary.docuHeight - boxHeight || elPos.left >= boundary.docuWidth - boxWidth;
  if (positionCheck) {
    console.log("Hit Boundary", elPos);
    Object.assign(el.style, {top: String(boundary.docuHeight / 2) +"px", left: String(boundary.docuWidth / 2) +"px"});
  }
}
