class Button extends Box {
    constructor(options) {
        super(options);
        this._callback = options.hasOwnProperty("callback") ? options.callback : null;
        this._fillColors.default = options.hasOwnProperty("fillColorDefault") ? options.fillColorDefault : "#e8d661";
        this._fillColors.highlighted = options.hasOwnProperty("fillColorHighlighted") ? options.fillColorHighlighted : "#ffff00";
        this._strokeColors.default = "#000000";
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: options.hasOwnProperty("text") ? options.text : "",
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Bungee",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 15,
            fontColors: options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#000000"},
            stroke: false,
            fill: true
        })
    }

    click() {
        if(!this._callback ) {
            console.log("No callback assigned to this button: ", this._text);
        } else {
            this._callback();
        }
    }

    update(mx, my) {
        if (this.contains(mx, my)) {
            this._highlighted = true;
            this._ctx.canvas.style.cursor = "pointer";
        } else {
            this._highlighted = false;
            this._ctx.canvas.style.cursor = "default";
        }
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
            lineWidth: 3,
            strokeStyle: this.setStrokeStyle()
        });
        this._drawText.drawText({});
        // this.drawCross();
    }
}