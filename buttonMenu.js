class ButtonMenu extends Box {
    constructor(options) {
        super(options);
        this._drawText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: options.title,
            fontName: "Bungee",
            fontSize: "24",
            stroke: false,
            fill: true,
            hasDropShadow: options.hasOwnProperty("hasDropShadow") ? options.hasDropShadow : false,
            dropShadowColors: options.hasOwnProperty("dropShadowColors") ? options.dropShadowColors : {default: "#ffffff"}
        });
        this._buttons = [];
        this._show = false;
        this._showTitle = true;
    }

    get show() {
        return this._show;
    }

    get showTitle() {
        return this._showTitle;
    }

    get buttons() {
        return this._buttons;
    }

    set show(value) {
        this._show = value;
    }

    set showTitle(value) {
        this._showTitle = value;
    }

    addButton(button) {
        this._buttons.push(button);
    }

    update(mx, my) {
        if (this._buttons.length > 0) {
            this._buttons.forEach(b => {
                b.update(mx, my);
            });
        }
    }

    checkForClick(mx, my) {
        if (this._buttons.length > 0) {
            this._buttons.forEach(b => {
                if (b.contains(mx, my)) {
                    b.click();
                }
            });
        }
    }

    showAt(x, y) {
        let offsetX = x - this._x;
        let offsetY = y - this._y;
        this._x = x;
        this._y = y;
        this._buttons.forEach(b => {
            b.x += offsetX;
            b.y += offsetY;
        });
    }

    draw(px, py) {
        if (this._show) {
            // console.log("this._x: ", this._x);
            // console.log("this._y: ", this._y);
            // console.log("tx: ", tx);
            // console.log("ty: ", ty);
            // console.log("newX: ", this._x + tx);
            // console.log("newY: ", this._y + ty);
            // if (this._x === tx) {
            //     this._x += tx;
            // }
            // this._y += ty;
            this._shapes.rect(this._x, this._y, this._w, this._h, {
                stroke: true,
                strokeStyle: "#000000",
                fill: true,
                fillStyle: "#ffffff",
                lineWidth: 2
            });
            if (this._showTitle) {
                this._drawText.drawTextAtCoord(this.center().x, this._y - this._drawText.textHeight / 2);
            }
            if (this._buttons.length > 0) {
                this._buttons.forEach(b => {
                    b.draw();
                });
            }
        }
    }
}