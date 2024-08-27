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
  //   console.log("ANGLE:::", getAngle(event));
  //   // let b = document.getElementById('box-bounds');
  //   // b.innerText = getAngle(event) + " deg"
  // });
}

// // Function to set the app's mode to the mode the user has selected: dark or light.
// function setDarkMode() {
//   window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({matches}) => {
//     if(matches) {
//       document.body.classList.add('dark-mode');
//       document.getElementById("runaway-box").classList.add('dark-box');
//     } else {
//       document.body.classList.remove('dark-mode');
//       document.getElementById("runaway-box").classList.remove('dark-box');
//     }
//   })
// }

// Function to set the app's mode to the mode the user has selected: dark or light.
function getDarkMode() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
  // get the max width using math.max on every possible way to get the width
  // to improve compatability with different browsers.
  let docX = Math.max(
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
  // get the max height.
  let docY = Math.max(
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );

  // console.log(docX, docY);
  const boundary = {
    docuWidth: docX,
    docuHeight: docY,
  };

  return boundary;
}

function getAngle(event) {
  // get the boundaries of the boundary box.
  const b = document.getElementById('box-bounds').getBoundingClientRect();
  // because the top and left values change, the angle calculation changes...
  // Maybe need to get the absolute center of the element.
  const x = b.left + b.width / 2;
  const y = b.top + b.height / 2;
  const radians = Math.atan2((y - event.pageY), (x - event.pageX));
  // let radians = Math.atan2((b.top - event.pageX), (b.left - event.pageY));
  let degree = Math.round(radians * (180 / Math.PI));
  if(degree < 0) { degree = (degree + 360) % 360 }
  // 0 or 360 degrees is the top left of the box.
  return degree;
}

// move the box relative to which side the mouse is closest to it.
function moveBox(event) {
  // Trying to handle the mobile touch events.
  if(Array.isArray(event)) {
    event = event[0];
  }

  // get the boundaries of the bounary box.
  let el = document.getElementById('box-bounds');
  let elBoundary = el.getBoundingClientRect();

  // get the width and height of the boundary box
  // so we can move box knowing how getBoundingClientRect() diagram works.
  let width = elBoundary.width;
  let height = elBoundary.height;

  // get the X and Y position of the mouse/cursor on the page.
  let mouseX = event.pageX;
  let mouseY = event.pageY;

  // distance should just be a few calculations using the
  // above and below variables.
  let elTop = elBoundary.top;
  let elBottom = elBoundary.bottom;
  let elRight = elBoundary.right;
  let elLeft = elBoundary.left;

  // calculate the distance from the sides and store
  // them in what I will call distance variables.
  let distTop = Math.abs(elTop - mouseY);
  let distBottom = Math.abs(elBottom - mouseY);
  let distRight = Math.abs(elRight - mouseX);
  let distLeft = Math.abs(elLeft - mouseX);

  // get the minimum distance or one of the four distance variables
  // that has the shortest distance at any given time.
  let distMin = Math.min(distTop, distBottom, distRight, distLeft);

  // -------------------------
  // for circle test:
  const degrees = getAngle(event);

  // 0 or 360 degrees is the top left of the box.
  // 45 degrees is top left of box, so 135 is top right
  if((degrees >= 315 && degrees < 360) || (degrees >= 0 && degrees < 45)) {
    el.style.setProperty("left", String(event.pageX + 15) +"px")
  }
  if(degrees >= 45 && degrees < 135) {
    el.style.setProperty("top", String(event.pageY + 15) +"px")
  }
  if(degrees >= 135 && degrees < 225) {
    el.style.setProperty("left", String(event.pageX - width - 30) +"px")
  }
  if(degrees >= 225 && degrees < 315) {
    el.style.setProperty("top", String(event.pageY - height - 30) +"px")
  }
  // -------------------------

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
    el.style.setProperty("top", String(boundary.docuHeight / 2) +"px");
    el.style.setProperty("left", String(boundary.docuWidth / 2) +"px");
  }
}
