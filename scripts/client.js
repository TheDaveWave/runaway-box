/// <reference path="jquery-3.6.0.min.js" />

$(readyNow);

function readyNow() {
    console.log('jQuery ready');
    getMouseCoords();
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
        
        
        let el = $('#run-away');
        // let elBounding = el.getBoundingClienRect();

        let elBoundLeft = el.outerWidth;
        let elBoundTop = el.outerHeight;

        // console.log(elBounding);

        let el2 = (document).getElementById('box-bounds');
        let el2Bouding = el2.getBoundingClientRect();

        console.log(el2Bouding);

    });
}

// figure out margin calculationg

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

function testBS() {
    


}

