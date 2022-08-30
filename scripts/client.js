/// <reference path="jquery-3.6.0.min.js" />


$(document).ready(readyNow);


function getMouseCoords() {
    addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        // console.log(x,y);
        $('#mouse-position').html(`( ${y} ), ( ${x} )`);
        let el = $('#runaway-box');
        el.offset({top: el.offset().top,left: el.offset().left});
        console.log(el.offset().top, el.offset().left);
    });
}


function readyNow() {
    console.log('jQuery ready');
    getMouseCoords();
}
