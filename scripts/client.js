// Vanilla JS solution to running functions on document ready.
document.addEventListener("DOMContentLoaded", (event) => onReady(event));

// Functions to run on Document load.
function onReady(event) {
  getDarkMode();
  const border = getDocumentBorder();
  console.log(`Document Border - x: ${border.docuWidth}, y: ${border.docuHeight}`)

  const box = document.getElementById("box-bounds");
  box.addEventListener("mouseenter", function (event) {
    getElementBounds(event);
  });
  box.addEventListener("touchmove", function (event) {
    getElementBounds(event);
  });
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
  let d = document;
  let elBounds = d.getElementById("box-bounds").getBoundingClientRect();

  // still debating on subtracting these from the docX and docY here instead of the check in the moveBox function.
  let boxWidth = elBounds.width;
  let boxHeight = elBounds.height;

  // get the max width using math.max on every possible way to get the width
  // to improve compatability with different browsers.
  let docX = Math.max(
    // scrollWidth will get the document's width past the observed document width.
    // the scrollWidth and scrollHeight extend the boundaries of the document
    /* d.documentElement.scrollWidth,
      d.body.scrollWidth, */
    d.body.offsetWidth,
    d.documentElement.offsetWidth,
    d.documentElement.clientWidth
  );
  // get the max height.
  let docY = Math.max(
    // scrollHeight will get the document's width past the observed document height.
    /*  d.documentElement.scrollHeight,
      d.body.scrollHeight, */
    d.body.offsetHeight,
    d.documentElement.offsetHeight,
    d.documentElement.clientHeight
  );

  // console.log(docX, docY);
  const boundary = {
    docuWidth: docX,
    docuHeight: docY,
  };

  return boundary;
}

// gets the boundaries of the boundary box.
// needs to check which side of the element the mouse is nearest to,
// by calculating the distance between the boundaries/sides and the mouse.
// passes in the mouse event as a parameter.
function getElementBounds(mouse) {
  // Have to use vanilla JS to get the box bounds
  // getBoundingClientRect()
  let el = document.getElementById("box-bounds");
  let elBounding = el.getBoundingClientRect();

  // Trying to handle the mobile touch events.
  if(Array.isArray(mouse)) {
    mouse = mouse[0];
  }

  // get the X and Y position of the mouse/cursor on the page.
  let mouseX = mouse.pageX;
  let mouseY = mouse.pageY;

  // distance should just be a few calculations using the
  // above and below variables.
  let elTop = elBounding.top;
  let elBottom = elBounding.bottom;
  let elRight = elBounding.right;
  let elLeft = elBounding.left;

  // calculate the distance from the sides and store
  // them in what I will call distance variables.
  let distTop = Math.abs(elTop - mouseY);
  let distBottom = Math.abs(elBottom - mouseY);
  let distRight = Math.abs(elRight - mouseX);
  let distLeft = Math.abs(elLeft - mouseX);

  // get the minimum distance or one of the four distance variables
  // that has the shortest distance at any given time.
  let distMin = Math.min(distTop, distBottom, distRight, distLeft);

  // set side equal to an empty string.
  let side = "";

  // use a switch statement to see which dsitance variable
  // is the closest and assign the side variable a string
  // with the respective side.
  switch (distMin) {
    case distTop:
      side = "Top";
      break;
    case distBottom:
      side = "Bottom";
      break;
    case distLeft:
      side = "Left";
      break;
    case distRight:
      side = "Right";
      break;
    default:
      console.log("error");
  }

  // console.log('***** Closest Side *****');
  // console.log(side);

  // call move box, passing in side and mouse
  // event as parameters.
  moveBox(side, mouse);
}

// move the box relative to which side the mouse is closest to it.
function moveBox(side, mouseEvent) {
  // get the boundaries of the bounary box.
  let el = document.getElementById('box-bounds');
  let elBoundary = el.getBoundingClientRect();
  let mouse = mouseEvent;

  // get the width and height of the boundary box
  // so we can move box knowing how getBoundingClientRect() diagram works.
  let width = elBoundary.width;
  let height = elBoundary.height;

  // get the X and Y position of the mouse on the page.
  // let mouseX = mouseEvent.pageX;
  // let mouseY = mouseEvent.pageY;

  // check which side the mouse/cursor is on and
  // move the box accordingly.
  switch (side) {
    case "Top":
      // if mouse enters the border move the box away from top.
      el.style.setProperty("top", String(mouse.pageY + 10) +"px")
      break;
    case "Bottom":
      // if mouse enters the border move box towards the top.
      el.style.setProperty("top", String(mouse.pageY - height - 20) +"px")
      break;
    case "Left":
      // if mouse enters the border move box away from the left.
      el.style.setProperty("left", String(mouse.pageX + 10) +"px")
      break;
    case "Right":
      // if mouse enters the border move box toward the left.
      el.style.setProperty("left", String(mouse.pageX - width - 20) +"px")
      break;
      // defualt: console.log("Error getting side");
  }

  // get the document boundary.
  let boundary = getDocumentBorder();
  let d = document;
  let elBounds = d.getElementById("box-bounds").getBoundingClientRect();

  let boxWidth = elBounds.width;
  let boxHeight = elBounds.height;

  // get the element's postion.
  let elPos = {
    top: Number(el.style.top.substring(0, el.style.top.indexOf("px"))),
    left: Number(el.style.left.substring(0, el.style.left.indexOf("px")))
  }

  if (
    elPos.top <= 0 ||
    elPos.left <= 0 ||
    elPos.top >= boundary.docuHeight - boxHeight ||
    elPos.left >= boundary.docuWidth - boxWidth
  ) {
    console.log("Hit Boundary", elPos);
    el.style.setProperty("top", String(boundary.docuHeight / 2) +"px");
    el.style.setProperty("left", String(boundary.docuWidth / 2) +"px");
  }
}
