/// <reference path="jquery-3.6.0.min.js" />

$(document).ready(readyNow);


function getMouseCoords() {
    addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        // console.log(x,y);
    });
}




function readyNow() {
    console.log('jQuery ready');
    getMouseCoords();
}
