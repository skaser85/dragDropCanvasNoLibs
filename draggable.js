class Draggable extends Box {
    constructor(options) {
        super(options);
        this._prevX = 0;
        this._prevY = 0;
        this._droppable = options.hasOwnProperty("droppable") ? options.droppable : null;
        this._dragging = false;
        this._fillColors.highlighted = options.hasOwnProperty("fillColors") ? options.fillColors.highlighted : "rgba(140, 255, 58, .2)";
        this._font = "Lato";
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: options.hasOwnProperty("text") ? options.text : "",
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Lato",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 20,
            fontColors: options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#ffffff"},
            stroke: false,
            fill: true
        });
    }

    get droppable() {
        return this._droppable;
    }

    get dragging() {
        return this._dragging;
    }

    set dragging(value) {
        this._dragging = value;
    }

    attach(droppable) {
        if (this._droppable) {
            this._droppable.detach(this);
            droppable.attach(this);
            this._droppable = droppable;
        } else {
            droppable.attach(this);
            this._droppable = droppable;
        }
    }

    dragStart() {
        this._prevX = this._x;
        this._prevY = this._y;
    }

    reset() {
        this._x = this._prevX;
        this._y = this._prevY;
    }

    move(x, y) {
        this._x += x;
        this._y += y;
    }

    setFillStyle() {
        let fillStyle = this._fillColors.default;
        if (this._highlighted) {
            fillStyle = this._fillColors.highlighted;
        }
        return fillStyle;
    }

    setStrokeStyle() {
        let strokeStyle = this._strokeColors.default;
        if (this._highlighted) {
            strokeStyle = this._strokeColors.highlighted;
        }
        return strokeStyle;
    }

    draw() {
        this._shapes.rect(this._x, this._y, this._w, this._h, {
            fill: true,
            fillStyle: this.setFillStyle(),
            strokeStyle: this.setStrokeStyle(),
            lineWidth: 2,
        })
        this._drawText.drawText({
            splitChar: "-",
            eltWidth: this.width - 10
        });
        // this.drawCross();
    }
}