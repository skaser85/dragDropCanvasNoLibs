class DrawText {
    constructor(options) {
        this._ctx = options.ctx;
        this._elt = options.elt === "canvas" ? "canvas" : options.elt;
        this._x = options.elt === "canvas" ? options.x : null;
        this._y = options.elt === "canvas" ? options.y : null;
        this._text = options.text;
        this._textWidth = 0;
        this._charWidth = 0;
        this._textheight = 0;
        this._fontName = options.hasOwnProperty("fontName") ? options.fontName : "Consolas";
        this._fontSize = options.hasOwnProperty("fontSize") ? options.fontSize : 12;
        this._bold = options.hasOwnProperty("bold") ? options.bold : false;
        this._italic = options.hasOwnProperty("italic") ? options.italic : false;
        this._baseLine = options.hasOwnProperty("baseLien") ? options.baseLine : "middle";
        this._textAlign = options.hasOwnProperty("textAlign") ? options.textAlign : "center";
        this._hJust = options.hasOwnProperty("hJust") ? options.hJust : "center";
        this._vJust = options.hasOwnProperty("vJust") ? options.vJust : "center";
        this._fontColors = options.hasOwnProperty("fontColors") ? options.fontColors : {default: "#000000"};
        this._stroke = options.hasOwnProperty("stroke") ? options.stroke : false;
        this._fill = options.hasOwnProperty("fill") ? options.fill : true;
    }

    get ctx() {
        return this._ctx;
    }

    get text() {
        return this._text;
    }

    get textWidth() {
        this._ctx.save();
        this._ctx.font = this.buildFont();
        let w = this._ctx.measureText(this._text).width;
        this._ctx.restore();
        return w;
    }

    get charWidth() {
        this._ctx.save();
        this._ctx.font = this.buildFont();
        let cw = this._ctx.measureText("W").width;
        this._ctx.restore();
        return cw;
    }

    get textHeight() {
        this._ctx.save();
        this._ctx.font = this.buildFont();
        let ch = this._fontSize;
        this._ctx.restore();
        return ch;
    }

    get elt() {
        return this._elt;
    }

    get fontName() {
        return this._fontName;
    }

    get fontSize() {
        return this._fontSize;
    }

    get bold() {
        return this._fontBold;
    }

    get italic() {
        return this._fontItalic;
    }

    get baseLine() {
        return this._baseLine;
    }

    get textAlign() {
        return this._textAlign;
    }

    get hJust() {
        return this._hJust;
    }

    get vJust() {
        return this._vJust;
    }

    get fontColors() {
        return this._fontColors;
    }

    set text(value) {
        this._text = value;
    }

    set fontName(value) {
        this._fontName = value;
    }

    set fontSize(value) {
        if (typeof (value) !== number) {
            console.log("Font size must be a number - do not include 'px'.");
        } else {
            this._fontSize = value;
        }
    }

    set bold(value) {
        this._fontBold = value;
    }

    set italic(value) {
        this._fontItalic = value;
    }

    set baseLine(value) {
        switch (value) {
            case "top":
                this._baseLine = "top";
                break;
            case "hanging":
                this._baseLine = "hanging";
                break;
            case "middle":
                this._baseLine = "middle";
                break;
            case "ideographic":
                this._baseLine = "ideographic";
                break;
            case "bottom":
                this._baseLine = "bottom";
                break;
            default:
                this._baseline = "alphabetic";
        }
    }

    set textAlign(value) {
        switch (value) {
            case "end":
                this._textAlign = "end";
                break;
            case "center":
                this._textAlign = "center";
                break;
            case "left":
                this._textAlign = "left";
                break;
            case "right":
                this._textAlign = "right";
                break;
            default:
                this._textAlign = "start"
        }
    }

    set hJust(value) {
        switch (value) {
            case "left":
                this._hJust = this.elt.x;
                break;
            case "center":
                this._hJust = this._elt.center().x - this.textWidth / 2;
                break;
            case "right":
                this._hJust = this._elt.bounds().RIGHT - this.textWidth;
                break;
            default:
                this._hJust = this.elt.x;
        }
    }

    set vJust(value) {
        switch (value) {
            case "top":
                this._vJust = this._elt.y - this._fontSize;
                break;
            case "center":
                this._vJust = this._elt.center().y;
                break;
            case "bottom":
                this._vJust = this._elt.bounds().BOTTOM + this._fontSize;
                break;
            default:
                this._vJust = this._elt.center().y;
        }
    }

    buildFont() {
        if (this._bold && this._italic) {
            return `bold italic ${this._fontSize}px ${this._fontName}`;
        }
        if (this._bold) {
            return `bold ${this._fontSize}px ${this._fontName}`;
        }
        if (this._italic) {
            return `italic ${this._fontSize}px ${this._fontName}`;
        }
        return `${this._fontSize}px ${this._fontName}`;
    }


    sizeText(t) {
        if (this.textWidth > this._elt.width) {
            this._fontSize -= 2;
            this._ctx.font = `${this._fontSize}px ${this._font}`
            if (this._ctx.measureText(t).width > this._w) {
                this.sizeText(t);
            }
        }
    }

    setFontColor(fontColor) {
        let fc;
        if (fontColor) {
            fc =  fontColor;
        } else {
            fc = this._fontColors.default;
        }
        if(this._stroke) {
            this._ctx.strokeStyle = fc;
        } else {
            this._ctx.fillStyle = fc;
        }
    }

    sizeText(t, w) {
        if (this._ctx.measureText(t).width > w) {
            this._fontSize -= 2;
            this._ctx.font = `${this._fontSize}px ${this._font}`
            if (this._ctx.measureText(t).width > w) {
                this.sizeText(t);
            }
        }
    }

    splitText(startText, splitChar, w, finalText) {
        let textSplit = startText.split(splitChar);
        let wordCounter = 0;
        let tempText = [];
        while (this._ctx.measureText(tempText).width < w) {
            tempText.push(textSplit[wordCounter]);
            wordCounter++;
            if (wordCounter > textSplit.length - 1) {
                break;
            }
        }
        if (this._ctx.measureText(tempText).width > w) {
            tempText = tempText.slice(0, tempText.length - 1);
            wordCounter--;
        }
        finalText[finalText.length] = tempText.join(" ").trim();
        finalText[finalText.length] = textSplit.slice(wordCounter).join(" ").trim();
        return finalText;
    }


    drawText(options) {
        let splitChar = options.hasOwnProperty("splitChar") ? options.splitChar : " ";
        this._ctx.save();
        this._ctx.font = this.buildFont();
        this._ctx.textBaseline = options.hasOwnProperty("baseLine") ? options.baseLine : this._baseLine;
        this.setFontColor(options.hasOwnProperty("fontColor") ? options.fontColor : "");
        let w = options.hasOwnProperty("eltWidth") ? options.eltWidth : this._elt.width;
        let textWidth = Math.floor(this.textWidth);
        let charWidth = Math.floor(this.charWidth);
        let numChars = Math.floor(w / charWidth);
        // need to check if the text includes the splitChar otherwise
        // we'll infinite loop trying to split something that can't
        // be split
        if (textWidth > w && this._text.includes(splitChar)) {
            let text = this.splitText(this._text, splitChar, w, []);
            while (this._ctx.measureText(text[text.length - 1]).width > w) {
                let startText = text[text.length - 1];
                if (splitChar !== " ") {
                    startText = text[text.length - 1].replace(" ", splitChar);
                }
                text = text.slice(0, text.length - 1);
                text = this.splitText(startText, splitChar, w, text);
            }
            let lineHeight = this._fontSize + 2
            let numLines = text.length;
            let totalTextHeight = lineHeight * numLines;
            let centerX = this._elt.center().x;
            let tempVjust = this._elt.center().y - (totalTextHeight / 2) + lineHeight / 2;
            for (let i = 0; i < text.length; i++) {
                let tempHjust = centerX - (this._ctx.measureText(text[i]).width / 2)
                if (this._stroke) {
                    this._ctx.strokeText(text[i], tempHjust, tempVjust);
                } else {
                    this._ctx.fillText(text[i], tempHjust, tempVjust);
                }
                tempVjust += lineHeight;
            }
        } else {
            if (textWidth > w) {
                this.sizeText(this._text, w);
            }
            this.hJust = options.hasOwnProperty("hJust") ? options.hJust : "center";
            this.vJust = options.hasOwnProperty("vJust") ? options.vJust : "center";
            if (this._stroke) {
                this._ctx.strokeText(this._text, this.hJust, this.vJust);
            } else {
                this._ctx.fillText(this._text, this.hJust, this.vJust);
            }
        }
        this._ctx.restore();
    }

    drawTextAtCoord(x, y) {
        this._ctx.save();
        this._ctx.font = this.buildFont();
        this._ctx.textBaseline = this._baseLine;
        this._ctx.textAlign = this._textAlign;
        this.setFontColor();
        if (this._stroke) {
            this._ctx.stroke(this._text, x, y);
        } else {
            this._ctx.fillText(this._text, x, y);
        }
        this._ctx.restore();
    }

    drawTextVertical(vJust = "center") {
        this._ctx.save();
        this._ctx.font = this.buildFont();
        this.setFontColor();
        let text = this._text.split("");
        let lineHeight = this._fontSize + 10;
        let totalTextHeight = lineHeight * text.length;
        let halfHeight = totalTextHeight / 2;
        let centerX = this._elt.center().x - this._ctx.measureText("O").width / 2;
        let y;
        switch (vJust) {
            case "center":
                y = this._elt.center().y - halfHeight + (lineHeight / 2);
                break;
            case "top":
                y = this._elt.y + lineHeight;
                break;
            case "bottom":
                y = this._elt.bounds().BOTTOM - totalTextHeight + (lineHeight / 2);
                break;
        }
        text.forEach((t, i) => {
            if (this._stroke) {
                this._ctx.strokeText(t, centerX, y);
                y += lineHeight;
            } else {
                this._ctx.fillText(t, centerX, y);
                y += lineHeight;
            }
        })
        this._ctx.restore();
    }
}