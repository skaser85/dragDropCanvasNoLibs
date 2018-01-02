let canvas = new Canvas({elt: document.querySelector("canvas")});

//setup pool
canvas.createPool();

// setup part row block
canvas.createBlock("J100");

// add menu
// the "true" argument is for the drop shadown param
canvas.createMenu(2, canvas.height - 303, "MENU", true);

// add inital parts to pool
canvas.createParts();

// initialize canvas dimensions and color as well as event listeners
canvas.init();

// draw stuff
draw = () => {
    canvas.draw();
    requestAnimationFrame(draw);
}

draw();