class TextBox extends Box {
    constructor(options) {
        super(options);
        this._parent = options.parent;
        this._fillColors.default = "rgba(0,0,0,0)";
        this._fillColors.highlighted = "rgba(150, 50, 50, 50)";
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: options.hasOwnProperty("text") ? options.text : "",
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Lato",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 20,
            fontColors: {
                default: "#000000", 
                highlighted: "#ffffff"
            },
            stroke: false,
            fill: true
        });
    }

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    bounds() {
        return {
            TOP: this._y - this._drawText.fontSize,
            RIGHT: this._x + this._parent.width,
            BOTTOM: this._parent.y,
            LEFT: this._x
        }
    }

    setFillStyle() {
        if (this._highlighted) {
            return this._fillColors.highlighted;
        }
        return this._fillColors.default;
    }

    setFontcolor() {
        if(this._highlighted) {
            return this._drawText.fontColors.highlighted;
        }
        return this._drawText.fontColors.default;
    }

    draw() {
        this._shapes.rect(this._x, this._y, this._w, this._h, {
            fill: true,
            fillStyle: this.setFillStyle(),
            stroke: false,
        });
        this._drawText.drawText({
            fontColor: this.setFontcolor()
        });
    }
}