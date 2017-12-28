let canvas = new Canvas({elt: document.querySelector("canvas")});

//setup pool
canvas.createPool();

// setup part row block
canvas.createBlock("J100");

// add menu
canvas.createMenu(2, canvas.height - 303, "MENU");

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