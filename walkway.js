class Walkway extends Droppable {
    constructor(options) {
        super(options);
        this.fillColors.default = "#ffff00";
        this._strokeColors = {
            default: "#ffff00",
            selected: "#ff0000"
        }
        this._isDroppable = false;
        this._text = options.text;
        this._selected = false;
        this._textBox = null;
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: this._text,
            fontName: "Bungee",
            fontSize: 24,
            fontColors: {
                default: "#0066aa"
            },
            stroke: false,
            fill: true
        })
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    setStrokeStyle() {
        if (this._selected) {
            return this._strokeColors.selected;
        }
        return this._strokeColors.default;
    }

    draw() {
        if(this._textBox._drawText.text === "HP") {
            // debugger;
        }
        this._shapes.rect(this._x, this._y, this._w, this._h, {
            fill: true,
            fillStyle: this._fillColors.default,
            stroke: true,
            strokeStyle: this.setStrokeStyle(),
            lineWidth: this._selected ? 5 : 2
        })
        this._drawText.drawTextVertical("center");
        this._textBox.draw();
    }
}