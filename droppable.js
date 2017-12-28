class Droppable extends Box {
    constructor(options) {
        super(options);
        this._isDroppable = options.hasOwnProperty("isDroppable") ? options.isDroppable : true;
        this._draggables = options.hasOwnProperty("draggables") ? options.draggables : [];
        this._fillColors = {
            default: options.hasOwnProperty("fillColors") && options.fillColors.default ? options.fillColors.default : "#bebebe",
            highlighted: options.hasOwnProperty("fillColors") && options.fillColors.highlighted ? options.fillColors.highlighted : "rgba(173,58,255, .1)",
            noDrop: options.hasOwnProperty("fillColors") && options.fillColors.noDrop ? options.fillColors.noDrop : "rgba(247, 42, 19, .3)",
            noDropHighlighted: options.hasOwnProperty("fillColors") && options.fillColors.noDropHighlighted ? options.fillColors.noDrop : "rgba(247, 42, 19, .6)"
        }
        this._strokeColors = {
            default: options.hasOwnProperty("strokeColors") && options.strokeColors.default ? options.strokeColors.default : "#65e4f2",
            highlighted: options.hasOwnProperty("strokeColors") && options.strokeColors.highlighted ? options.strokeColors.highlighted : "#65e4f2",
            noDrop: options.hasOwnProperty("strokeColors") && options.strokeColors.noDrop ? options.strokeColors.noDrop : "#ff0000"
        }
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: options.hasOwnProperty("text") ? options.text : "",
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Lato",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 20,
            fontColors: options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#000000"},
            stroke: false,
            fill: true
        });
    }

    get isDroppable() {
        return this._isDroppable;
    }

    get draggables() {
        return this._draggables;
    }

    set isDroppable(value) {
        this._isDroppable = value;
    }

    attach(dragger) {
        if (!this.find(dragger)) {
            this._draggables.push(dragger);
        }
        this.realign();
    }

    detach(dragger) {
        if (this.find(dragger)) {
            this._draggables = this._draggables.filter(d => {
                return d !== dragger;
            });
            this.realign();
        }
    }

    realign() {
        let wider = this._w > this._h;
        if (this._draggables.length > 0) {
            if (wider) {
                let row = 0;
                let col = 0;
                let totalCols = Math.floor(this._w / this._draggables[0].width);
                this._draggables.forEach((d, i) => {
                    if (i % totalCols === 0 && i !== 0) {
                        row++;
                    }
                    col = (i * d.width) % this._w;
                    d.x = this._x + col;
                    d.y = this._y + (row * d.height);
                });
            } else { //longer than wider
                let row = 0;
                let col = 0;
                let totalRows = Math.floor(this._h / this._draggables[0].height);
                this._draggables.forEach((d, i) => {
                    if (i % totalRows === 0 && i !== 0) {
                        col++;
                    }
                    row = (i * d.height) % this._h;
                    d.x = this._x + col;
                    d.y = this._y + row;
                });
            }
        }
    }

    find(dragger) {
        return this._draggables.indexOf(dragger) !== -1;
    }

    setFillStyle() {
        let fillStyle = this._fillColors.default;
        if (!this._isDroppable) {
            fillStyle = this._fillColors.noDrop;
            if (this._highlighted) {
                fillStyle = this._fillColors.noDropHighlighted;
            }
        }
        if (this._highlighted && this.isDroppable) {
            fillStyle = this._fillColors.highlighted;
        }
        return fillStyle;
    }

    setStrokeStyle() {
        let strokeStyle = this._strokeColors.default;
        if (!this._isDroppable) {
            strokeStyle = this._strokeColors.noDrop;
        }
        if (this._highlighted && this._isDroppable) {
            strokeStyle = this._strokeColors.highlighted;
        }
        return strokeStyle;
    }

    draw() {
        this._shapes.rect(this._x, this._y, this._w, this._h, {
            fill: true,
            fillStyle: this.setFillStyle(),
            stroke: true,
            strokeStyle: this.setStrokeStyle(),
            lineWidth: 2
        });
        this._drawText.drawText({
            hJust: "center",
            vJust: "top"
        });
        this._ctx.closePath();
    }
}