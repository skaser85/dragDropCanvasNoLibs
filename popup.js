class PopUp extends Box {
    constructor(options) {
        super(options);
        this._show = false;
        this._buttons = [];
        this._cancelButton = new Button({
            ctx: this._ctx,
            x: this._x + this._w - 105,
            y: this._y + this._h - 55,
            w: 100,
            h: 50,
            text: "CLOSE",
            callback: () => {
                this._show = false;
                this._highlighted = false;
            }
        });
        this._buttons.push(this._cancelButton);
        this._bodyText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: this._text,
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Lato",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 15,
            fontColors: options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#000000"},
            stroke: false,
            fill: true
        });
        this._headerText = new DrawText({
            ctx: this._ctx,
            elt: this,
            text: this._header,
            fontName: options.hasOwnProperty("fontName") ? options.fontName : "Bungee",
            fontSize: options.hasOwnProperty("fontSize") ? options.fontSize : 15,
            fontColors: options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#000000"},
            stroke: false,
            fill: true
        });
    }

    get show() {
        return this._show;
    }

    get buttons() {
        return this._buttons;
    }

    get headerText() {
        return this._headerText;
    }

    get bodyText() {
        return this._bodyText;
    }

    set show(value) {
        this._show = value;
    }

    update(mx, my) {
        this._buttons.forEach(b => {
            b.update(mx, my);
        });
    }

    draw() {
        if (this._show) {
            /* BODY RECT AND TEXT */
            this._shapes.rect(this._x, this._y, this._w, this._h, {
                stroke: true,
                strokeStyle: "#000000",
                fill: true,
                fillStyle: "#eeefff"
            });
            this._bodyText.drawText({});

            /* HEADER RECT AND TEXT */
            this._shapes.rect(this._x+1, this._y+1, this._w-2, this._headerText.fontSize + 20, {
                fill: true,
                fillStyle: "#dddddd",
                stroke: false
            });
            this._headerText.drawTextAtCoord(this._x + (this._ctx.measureText(this._headerText.text).width / 2) + 55, this._y + this._headerText.fontSize);

            this._buttons.forEach(b => {
                b.draw();
            });
        }
    }
}