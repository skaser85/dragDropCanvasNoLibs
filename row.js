class PartRow extends Droppable {
    constructor(options) {
        super(options);
        this._baseLine = "top";
        this._selected = false;
        this._strokeColors.selected = "#ff0000";
        this._rowNum = options.rowNum;
    }

    get selected() {
        return this._selected;
    }

    get rowNum() {
        return this._rowNum;
    }

    set selected(value) {
        this._selected = value;
    }

    set rowNum(value) {
        this._rowNum = value;
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
        if (!this._isDroppable) {
            return this._strokeColors.noDrop;
        }
        if(this._selected) {
            return this._strokeColors.selected;
        }
        if (this._highlighted) {
            return this._strokeColors.highlighted;
        }
        return this._strokeColors.default;
    }

    draw() {
        this._shapes.rect(this._x, this._y, this._w, this._h, {
            fill: true,
            fillStyle: this.setFillStyle(),
            stroke: true,
            strokeStyle: this.setStrokeStyle(),
            lineWidth: this._selected ? 5 : 2
        })
        this._textBox.draw();
    }
}