/// <reference path="jquery-3.6.0.min.js" />

$(readyNow);

function readyNow() {
    console.log('jQuery ready');
    getMouseCoords();
    getElementBounds();
    runAway();
    checkMouseOver();
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
        $('#mouse-position').css('z-index', '1');
        
        
        let el = $('#run-away');
        // let elBounding = el.getBoundingClienRect();

        let elBoundLeft = el.outerWidth;
        let elBoundTop = el.outerHeight;

        // console.log(elBounding);

        let el2 = (document).getElementById('box-bounds');
        let el2Bounding = el2.getBoundingClientRect();


    });
}

// figure out margin calculation

// figure out if the mouse is within range of element
// return true if it is.
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
function getElementBounds () {
    
    let el = (document).getElementById('box-bounds');
    let elBounding = el.getBoundingClientRect();

    let elTop = elBounding.top;
    let elBottom = elBounding.bottom;
    let elRight = elBounding.right;
    let elLeft = elBounding.left;

    console.log('* Element Bounding: Box-Bounds *');
    console.log(elBounding);
    console.log('Bounding Top:',elTop);
    console.log('Bounding Right:',elRight);
    console.log('Bounding Bottom:',elBottom);
    console.log('Bounding Left:',elLeft);

}

