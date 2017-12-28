class Canvas {
    constructor(options) {
        this._elt = options.hasOwnProperty("elt") ? options.elt : new Error("No canvas element passed to Canvas constructor.");
        this._ctx = this._elt.getContext("2d");
        this._width = options.hasOwnProperty("width") ? options.width : 3000;
        this._height = options.hasOwnProperty("height") ? options.height : window.innerHeight;
        this._background = options.hasOwnProperty("background") ? options.background : "#888"; //"#e8eaee"
        this._parts = null;
        this._droppables = null;
        this._block = null;
        this._menu = null;
        this._mousePressed = false;
        this._mouseReleased = false;
        this._pool = null;
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

    get droppables() {
        return this._droppables;
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

    set droppables(value) {
        this._droppables = value;
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

    set pool(value) {
        this._droppables = value;
        this._pool = value.pool;
    }

    createPool() {
        let pool = createPool(this);
        this._droppables = pool;
        this._pool = pool.pool;
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
        this._parts.update(e.x, e.y, e.movementX, e.movementY, this._mousePressed);
        this._droppables.update(e.x, e.y);
        this._block.update(e.x, e.y);
        this._menu.update(e.x, e.y);
    }

    mousedown(e) {
        this._mousePressed = true;
        this._mouseReleased = false;
    }

    mouseup(e) {
        this._mousePressed = false;
        this._mouseReleased = true;
        this._parts.drop([this._droppables.highlighted, this._block.rows.highlighted]);
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
        this._ctx.clearRect(0, 0, this.width, this.height);
        this._block.draw();
        this._droppables.draw();
        this._parts.draw();
        this._menu.draw();
    }
}