/// <reference path="jquery-3.6.0.min.js" />

$(readyNow);

function readyNow() {
    console.log('jQuery ready');
    // getMouseCoords();
    $('#box-bounds').on('mouseenter', getElementBounds);
    // getElementBounds();
    // runAway();
    // checkMouseOver();
}

const width = $(window).width - 100;
const height = $(window).height - 100;

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

function runAway() {
    let el = $('#runaway-box');
    let elCoords = el.offset();
    let top = Math.random(20) * height;
    let left = Math.random(20) * width;

    el.html(`( ${elCoords.top} , ${elCoords.left} )`);
        // el.offset({top: el.offset().top,left: el.offset().left});
        // console.log(el.offset().top, el.offset().left);

    el.css({top: el.offset().top + top, left: el.offset().left - left});
}

// figure out if the mouse is within range of element
// return true if it is.
// checks when mouse enters of leave he boundary box surrounding the
// runaway box.
function checkMouseOver () {
    let check = false;
    $('#box-bounds').on('mouseenter', () => {check = true; 
        console.log('Entered:',check);});
    $('#box-bounds').on('mouseleave', () => {check = false; 
        console.log('Exited should be false:',check);});
    return check;
}

// gets the boundaries of the boundary box.
// needs to check which side of the element the mouse is nearest to.
// needs mouse coords and the position of the sides?
// needs the distance between the boundaries and the mouse^
// pass in the mouse event??
function getElementBounds () {

    addEventListener('mousemove', (mouse) => {
        let el = (document).getElementById('box-bounds');
        let elBounding = el.getBoundingClientRect();

        let mouseX = mouse.pageX;
        let mouseY = mouse.pageY;

        // distance should just be a few calculations using the above and below
        // variables.
        let elTop = elBounding.top;
        let elBottom = elBounding.bottom;
        let elRight = elBounding.right;
        let elLeft = elBounding.left;

        // calculate the distance from the sides.
        let distTop = Math.abs(elTop - mouseY);
        let distBottom = Math.abs(elBottom - mouseY);
        let distRight = Math.abs(elRight - mouseX);
        let distLeft = Math.abs(elLeft - mouseX);

        // console.log('Distance from top:',distTop);
        // console.log('Distance from bottom:',distBottom);
        // console.log('Distance from right:',distRight);
        // console.log('Distance from left:',distLeft);

        let distMin = Math.min(distTop,distBottom,distRight,distLeft);
        // console.log('******************');
        // should give us the value of the closest side.
        // console.log('Min:',distMin);

        // log what side is the closest.
        let side = '';

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

        // for some reason if you are far enough from the bottom or top
        // it logs the left or right respectively.
        console.log('***** Closest Side *****');
        console.log(side);


        // console.log('* Element Bounding: Box-Bounds *');
        // console.log(elBounding);
        // console.log('Bounding Top:',elTop);
        // console.log('Bounding Right:',elRight);
        // console.log('Bounding Bottom:',elBottom);
        // console.log('Bounding Left:',elLeft);
        
        moveBox(side, mouse);
    // return side;
    });

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

    // get Mouse position.
    // let mouseX = mouseEvent.pageX;
    // let mouseY = mouseEvent.pageY;


    switch(side) {
        case 'Top':
            // if mouse enters the border move the box
            // away from top.
            el.css({
               top: mouse.pageY + 20
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
                left: mouse.pageX + 20
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

