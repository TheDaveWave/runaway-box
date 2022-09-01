/// <reference path="jquery-3.6.0.min.js" />


$(document).ready(readyNow);


const width = $(window).width - 100;
const height = $(window).height - 100;

function getMouseCoords() {
    addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        // console.log(x,y);
        $('#mouse-position').html(`( ${x} ), ( ${y} )`); 
        
        
        let el = $('#run-away');
        let elBounding = el.getBoundingClienRect();

        let elBoundLeft = el.outerWidth;
        let elBoundTop = el.outerHeight;

        


    });
}

// figure out margin calculationg

// figure out the the mouse is within range of element
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


function readyNow() {
    console.log('jQuery ready');
    getMouseCoords();
}
