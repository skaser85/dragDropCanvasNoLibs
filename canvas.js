class Canvas {
    constructor(options) {
        this._elt = options.hasOwnProperty("elt") ? options.elt : new Error("No canvas element passed to Canvas constructor.");
        this._ctx = this._elt.getContext("2d");
        this._width = options.hasOwnProperty("width") ? options.width : 3000;
        this._height = options.hasOwnProperty("height") ? options.height : window.innerHeight;
        this._background = options.hasOwnProperty("background") ? options.background : "#888"; //"#e8eaee"
        this._parts = null;
        this._poolContainer = null;
        this._block = null;
        this._menu = null;
        this._mousePressed = false;
        this._mouseReleased = false;
        this._poolContainer = null;
        this._partHighlighted = null;
    }

    get elt() {
        return this._elt;
    }

    get ctx() {
        return this._ctx;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get background() {
        return this._background;
    }

    get parts() {
        return this._parts;
    }

    get block() {
        return this._block;
    }

    get menu() {
        return this._menu;
    }

    get mousePressed() {
        return this._mousePressed;
    }

    get mouseReleased() {
        return this._mouseReleased;
    }

    get pool() {
        return this._pool;
    }

    set width(value) {
        this._width = value;
    }

    set height(value) {
        this._height = value;
    }

    set background(value) {
        this._background = value;
    }

    set parts(value) {
        this._parts = value;
    }

    set block(value) {
        this._block = value;
    }

    set menu(value) {
        this._menu = value;
    }

    set mousePressed(value) {
        this._mousePressed = value;
    }

    set mouseReleased(value) {
        this._mouseRelease = value;
    }

    createPool() {
        let poolContainer = createPool(this);
        this._poolContainer = poolContainer;
        this._pool = poolContainer.pool;
    }

    createBlock(rowNum) {
        this._block = createRow(this, rowNum);
    }

    createMenu(x, y, title) {
        this._menu = createMenu(this, this.block, x, y, title);
        this._menu.show = true;
    }

    createParts() {
        this._parts = createParts(this, this._pool);
    }

    mousemove(e) {
        if (this._block.popup.show) {
            this._block.popup.update(e.x, e.y);
        } else if (this._block.menu.show) {
            this._block.menu.update(e.x, e.y);
        } else {
            // do we need a separate variable for the part that's highlighted?
            // why not just say this._parts.highlighted
            this._partHighlighted = this._parts.update(e.x, e.y, e.movementX, e.movementY, this._mousePressed);
            this._poolContainer.update(e.x, e.y, this._partHighlighted);
            this._block.update(e.x, e.y, this._partHighlighted);
            this._menu.update(e.x, e.y);
        }
    }

    mousedown(e) {
        this._mousePressed = true;
        this._mouseReleased = false;
    }

    mouseup(e) {
        this._mousePressed = false;
        this._mouseReleased = true;
        // console.log(this._poolContainer.highlighted);
        this._parts.drop([this._poolContainer.highlighted, this._block.rows.highlighted]);
        this._block.checkForClick(e.x, e.y);
        this._menu.checkForClick(e.x, e.y);
    }

    init() {
        // initialize canvas dimensions and background color
        this._elt.width = this._width;
        this._elt.height = this._height;
        this._elt.style.background = this._background;

        // add event listeners
        this._elt.addEventListener("mousemove", (e) => { this.mousemove(e) });
        this._elt.addEventListener("mousedown", (e) => { this.mousedown(e) });
        this._elt.addEventListener("mouseup", (e) => { this.mouseup(e) });
    }

    draw() {
        // clear the screen at the start of every frame
        this._ctx.clearRect(0, 0, this.width, this.height);
        // draw the menu
        this._menu.draw();
        // draw the row, walkways, hoist poles and beams
        this._block.draw();
        // draw the pool
        this._poolContainer.draw();
        // draw the parts - this needs to happen after all the droppables
        // have been drawn so that the parts get drawn on top of the rows
        this._parts.draw();

        if (this._block.popup.show) {
            this._block.popup.draw();
        }

        if (this._block.menu.show) {
            this._block.menu.draw();
        }
    }
}