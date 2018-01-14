class RowBlock {
    constructor(options) {
        this._ctx = options.ctx;
        this._pool = options.pool;
        this.letter = options.letter;
        this.block = options.block;
        this.length = 50;
        this.rows = new Droppables;
        this.top = 50;
        this.size = {
            w: 100,
            h: 500
        };
        this._partRowCount = 0;
        this._textBoxes = [];
        this._itemSelected = null;
        this._popupW = 400;
        this._popupH = 200;
        this._popup = new PopUp({
            ctx: this._ctx,
            x: (window.innerWidth / 2) - (this._popupW / 2),
            y: (window.innerHeight / 2) - (this._popupH / 2),
            w: this._popupW,
            h: this._popupH,
            font: "Lato",
            fontSize: 20
        });
        this._menu = createFloatingMenu(this._ctx, this, 100, 100, `${this.letter}${this.block}00`);
        this._menu.showTitle = false;
    }

    get menu() {
        return this._menu;
    }

    get popup() {
        return this._popup;
    }

    update(mx, my, partHighlighted) {
        this.rows.update(mx, my, partHighlighted);
        for (let i = 0; i < this.rows.droppables.length; i++) {
            let t = this.rows.droppables[i]._textBox;
            if (t.contains(mx, my)) {
                t.highlighted = true;
            } else {
                t.highlighted = false;
            }
        }
    }

    checkForClick(mx, my, tx, ty) {
        for (let i = 0; i < this.rows.droppables.length; i++) {
            let t = this.rows.droppables[i]._textBox;
            if (t.contains(mx, my)) {
                let item = t.parent;
                // if the item selected is the current item then...
                if (this._itemSelected === item) {
                    // unseelct the item and set _itemSelected to false
                    this._itemSelected.selected = false;
                    this._itemSelected = null;
                } else {
                    // if there is an _itemSelected then...
                    if (this._itemSelected) {
                        // unselect that item
                        this._itemSelected.selected = false;
                        // set _itemSelected to the one that was clicked on
                        this._itemSelected = item;
                        // set the new _itemSelected's selected prop to true
                        this._itemSelected.selected = true;
                    } else {
                        // set _itemSelected to the one that was clicked on
                        this._itemSelected = item;
                        // set the new _itemSelected's selected prop to true
                        this._itemSelected.selected = true;
                    }
                }
            }
        }
        if(this._itemSelected) {
            let b = this._itemSelected.bounds();
            this._menu.showAt(b.RIGHT + tx, b.TOP - 25 + ty);
            this._menu.show = true;
        } else {
            this._menu.show = false;
        }
        if (this._popup.show) {
            this._popup.buttons.forEach(b => {
                if (b.contains(mx, my)) {
                    b.click();
                }
            });
        }
        if (this._menu.show) {
            this._menu.checkForClick(mx, my);
        }
    }

    deleteItem() {
        if (this._itemSelected) {
            if (this._itemSelected.__proto__.constructor === PartRow) {
                if (this._itemSelected.draggables.length > 0) {
                    this._itemSelected.draggables.forEach(dragger => {
                        dragger.move(this._pool.x, this._pool.y);
                        dragger.attach(this._pool);
                    })
                }
            }
            this.rows.removeDroppable(this._itemSelected);
            this._itemSelected = null;
            this.realignBlock();
            this._menu.show = false;
        } else {
            this._popup.headerText.text = "No Selection";
            this._popup.bodyText.text = "Nothing selected. Please select an object before trying to delete something."
            this._popup.show = true;
        }
    }

    realignBlock() {
        let startX = 5;
        this._partRowCount = 0;
        this.rows.droppables.forEach(d => {
            d.x = startX;
            if (d.__proto__.constructor === PartRow) {
                d.rowNum = `${this.letter}${this.block}${this.getNextRowNumber()}`;
                d._textBox._drawText.text = d.rowNum;
                d.draggables.forEach(dragger => {
                    dragger.move(d.x, d.y);
                    dragger.attach(d);
                })
            }
            d._textBox.x = d.x;
            startX = d.bounds().RIGHT + 3;
        });
    }

    addItem(itemName) {
        this.rows.addDroppable(this.createItem(itemName));
        this._menu.show = false;
    }

    createItem(itemName) {
        let item;
        switch (itemName) {
            case "partRow":
                item = this.createRow();
                break;
            case "beam":
                item = this.createBeam();
                break;
            case "hp":
                item = this.createHoistPole();
                break;
            case "ww":
                item = this.createWalkway();
        }
        return item;
    }

    addItemLeft(itemName) {
        if (this._itemSelected) {
            let idx = this.rows.droppables.indexOf(this._itemSelected);
            let item = this.createItem(itemName);
            item._textBox.x = item.x = this.rows.droppables[idx].x;
            this.rows.droppables.splice(idx, 0, item);
            this.realignBlock();
            this._itemSelected.selected = false;
            this._itemSelected = null;
            this._menu.show = false;
        } else {
            this._popup.headerText.text = "No Selection";
            this._popup.bodyText.text = "Nothing selected. Please select an object before trying to delete something."
            this._popup.show = true;
        }
    }

    addItemRight(itemName) {
        if (this._itemSelected) {
            let idx = this.rows.droppables.indexOf(this._itemSelected);
            let item = this.createItem(itemName);
            item._textBox.x = item.x = this.rows.droppables[idx].x;
            this.rows.droppables.splice(idx + 1, 0, item);
            this.realignBlock();
            this._itemSelected.selected = false;
            this._itemSelected = null;
            this._menu.show = false;
        } else {
            this._popup.headerText.text = "No Selection";
            this._popup.bodyText.text = "Nothing selected. Please select an object before trying to delete something."
            this._popup.show = true;
        }
    }

    createRow() {
        let newRow = new PartRow({
            ctx: this._ctx,
            x: this.getStartX(),
            y: this.top,
            w: this.size.w,
            h: this.size.h,
            rowNum: `${this.letter}${this.block}${this.getNextRowNumber()}`
        });
        newRow._textBox = new TextBox({
            ctx: newRow._ctx,
            x: newRow.x,
            y: newRow.y - newRow._drawText.fontSize - 4,
            w: newRow.width,
            h: newRow._drawText.fontSize + 2,
            parent: newRow,
            text: newRow.rowNum
        });
        return newRow;
    }

    createBeam() {
        let newBeam = new Beam({
            ctx: this._ctx,
            x: this.getStartX(),
            y: this.top,
            w: this.size.w / 3,
            h: this.size.h,
            text: "BEAM",
            hasDropShadow: true,
            dropShadowColors: {default: "#0000ff"}
        });
        newBeam._textBox = new TextBox({
            ctx: newBeam._ctx,
            x: newBeam.x,
            y: newBeam.y - newBeam._drawText.fontSize - 4,
            w: newBeam.width,
            h: newBeam._drawText.fontSize + 2,
            parent: newBeam,
            text: "B"
        })
        return newBeam;
    }

    createHoistPole() {
        let newHP = new HoistPole({
            ctx: this._ctx,
            x: this.getStartX(),
            y: this.top,
            w: this.size.w / 4,
            h: this.size.h,
            text: "HOIST POLE",
            hasDropShadow: true,
            dropShadowColors: {default: "#999900"}
        });
        newHP._textBox = new TextBox({
            ctx: newHP._ctx,
            x: newHP.x,
            y: newHP.y - 24 - 4,
            w: newHP.width,
            // fontSize: 24,
            h: 24 + 2,
            parent: newHP,
            text: "HP"
        });
        return newHP;
    }

    createWalkway() {
        let ww = new Walkway({
            ctx: this._ctx,
            x: this.getStartX(),
            y: this.top,
            w: this.size.w / 2,
            h: this.size.h,
            text: "WALKWAY",
            hasDropShadow: true,
            dropShadowColors: {default: "#00ff00"}
        });
        ww._textBox = new TextBox({
            ctx: ww._ctx,
            x: ww.x,
            y: ww.y - ww._drawText.fontSize - 4,
            w: ww.width,
            h: ww._drawText.fontSize + 2,
            parent: ww,
            text: "WW"
        });
        return ww;
    }

    getStartX() {
        if (this.rows.droppables.length > 0) {
            let numRows = this.rows.droppables.length;
            let lastRow = this.rows.droppables[numRows - 1];
            return lastRow.bounds().RIGHT + 3;
        } else {
            return 5;
        }
    }

    getNextRowNumber() {
        this._partRowCount++;
        return this._partRowCount < 10 ? "0" + this._partRowCount : this._partRowCount;
    }

    draw() {
        if (this.rows.droppables.length > 0) {
            this.rows.draw();
        }
    }
}