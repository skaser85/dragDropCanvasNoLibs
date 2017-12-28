class Box {
    constructor(options) {
        this._ctx = options.ctx;
        this._x = options.x;
        this._y = options.y;
        this._w = options.w;
        this._h = options.h;
        this._highlighted = false;
        this._fillColors = {
            default: options.hasOwnProperty("fillColors") ? options.fillColors.default : "#000000",
            highlighted: options.hasOwnProperty("fillColors") ? options.fillColors.highlighted : "#8cff3a"
        }
        this._fillStyle = null;
        this._strokeColors = {
            default: options.hasOwnProperty("strokeColors") ? options.strokeColors.default : "#ffffff",
            highlighted: options.hasOwnProperty("strokColors") ? options.strokeColors.highlighted : "#000000"
        }
        this._strokeStyle = null;
        this._shapes = new Shapes(this._ctx);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._w;
    }

    get height() {
        return this._h;
    }

    get highlighted() {
        return this._highlighted;
    }

    get fillColors() {
        return this._fillColors;
    }

    get strokeColors() {
        return this._strokeColors;
    }

    get text() {
        return this._text;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    set width(value) {
        this._w = value;
    }

    set height(value) {
        this._h = value;
    }

    set highlighted(value) {
        this._highlighted = value;
    }

    set text(value) {
        this._text = value;
    }

    bounds() {
        return {
            TOP: this._y,
            RIGHT: this._x + this._w,
            BOTTOM: this._y + this._h,
            LEFT: this._x
        }
    }

    center() {
        let bounds = this.bounds();
        return {
            x: bounds.RIGHT - this._w / 2,
            y: bounds.BOTTOM - this._h / 2
        }
    }

    contains(x, y) {
        let bounds = this.bounds();
        return x > bounds.LEFT && x < bounds.RIGHT &&
            y > bounds.TOP && y < bounds.BOTTOM;
    }

    drawCross() {
        let center = this.center();
        let bounds = this.bounds();
        this._shapes.line(center.x, bounds.TOP, center.x, bounds.BOTTOM, {
            lineWidth: 2,
            strokeStyle: "#ffffff"
        });
        this._shapes.line(bounds.LEFT, center.y, bounds.RIGHT, center.y, {
            lineWidth: 2,
            strokeStyle: "#ffffff"
        });
    }
}