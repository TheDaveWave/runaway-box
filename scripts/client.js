/// <reference path="jquery-3.6.0.min.js" />

$(readyNow);

function readyNow() {
    
    getDocumentBorder();
    // handle events.
    $('#box-bounds').on('mouseenter', function(event){
        getElementBounds(event);
    });
}

// will need to get the position of the box and makes sure it does not 
// go past (0,0), (0, max height), (max width, 0), (max width, max height).

// gets the bounds of the page to keep the box from trailing off the page.
function getDocumentBorder() {

    let d = document;

    // get the max width using math.max on every possible way to get the width
    // to improve compatability with different browsers.
    let docX = Math.max(
        d.documentElement.scrollWidth,
        d.body.scrollWidth,
        d.body.offsetWidth, 
        d.documentElement.offsetWidth,
        d.documentElement.clientWidth);
    // get the max height.
    let docY = Math.max(
        d.documentElement.scrollHeight,
        d.body.scrollHeight,
        d.body.offsetHeight,
        d.documentElement.offsetHeight,
        d.documentElement.clientHeight);

    console.log(docX, docY);
    
}


// gets the boundaries of the boundary box.
// needs to check which side of the element the mouse is nearest to, 
// by calculating the distance between the boundaries/sides and the mouse.
// passes in the mouse event as a parameter.
function getElementBounds (mouse) {

    // Have to use vanilla JS to get the box bounds 
    // getBoundingClientRect() 
    let el = (document).getElementById('box-bounds');
    let elBounding = el.getBoundingClientRect();

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
    let distMin = Math.min(distTop,distBottom,distRight,distLeft);

    // set side equal to an empty string.
    let side = '';

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

// move the box relative to which side the mouse is closest to.
function moveBox(side, mouseEvent) {
    // get the boundaries of the bounary box.
    let el = $('#box-bounds');
    let mouse = mouseEvent;

    // get the width and height of the boundary box
    // so we can move box knowing how getBoundingClientRect()
    // diagram.
    let width = el.outerWidth();
    let height = el.outerHeight();

    // get the X and Y position of the mouse on the page.
    let mouseX = mouseEvent.pageX;
    let mouseY = mouseEvent.pageY;

    // check which side the mouse/cursor is on and
    // move the box accordingly.
    switch(side) {
        case 'Top':
            // if mouse enters the border move the box
            // away from top.
            el.css({
               top: mouse.pageY + 10
            });
            break;
        case 'Bottom':
            // if mouse enters the border move box
            // towards the top.
            el.css({
                top: mouse.pageY - height - 20
            });
            break;
        case 'Left':
            // if mouse enters the border move box
            // away from the left.
            el.css({
                left: mouse.pageX + 10
            });
            break;
        case 'Right':
            // if mouse enters the border move box
            // toward the left.
            el.css({
                left: mouse.pageX - width - 20
            });
            break;
        defualt:
            console.log('Error getting side');
    }
}

// display the X and Y position of the mouse on a div,
// can be used for testing purposes.
function getMouseCoords() {
    // e is shorthand for event.
    addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        // console.log(x,y);
        $('#mouse-position').html(`( ${x} ), ( ${y} )`); 
        getElementBounds(e);
    });
}

// check if the mouse is within range of element return true if it is.
// checks when mouse enters of leaves the boundary box surrounding the
// runaway box. Used for testing purposes.
function checkMouseOver () {
    let check = false;
    $('#box-bounds').on('mouseenter', () => {check = true; 
        console.log('Entered:',check);});
    $('#box-bounds').on('mouseleave', () => {check = false; 
        console.log('Exited should be false:',check);});
    return check;
}
