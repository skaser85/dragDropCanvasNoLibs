class Draggables {
    constructor() {
        this._draggables = [];
        this._highlighted = null;
    }

    get highlighted() {
        return this._highlighted;
    }

    addDraggable(dragger) {
        this._draggables.push(dragger);
    }

    update(mx, my, ox, oy, mousePressed) {
        // console.log("ox: ", ox);
        // console.log("oy: ", oy);
        if (this._highlighted) {
            if (!this._highlighted.contains(mx, my)) {
                this._highlighted.highlighted = false;
                this._highlighted._ctx.canvas.style.cursor = "default";
                if (this._highlighted.dragging) {
                    this._highlighted.reset();
                    this._highlighted.dragging = false;
                }
                this._highlighted = null;
            } else {
                if (mousePressed) {
                    if (!this._highlighted.dragging) {
                        this._highlighted.dragging = true;
                        this._highlighted.dragStart();
                        this._highlighted._ctx.canvas.style.cursor = "move";
                    }
                    this._highlighted.move(ox, oy);
                }
            }
        }

        if (!this._highlighted) {
            this._draggables.forEach(d => {
                if (d.contains(mx, my)) {
                    d.highlighted = true;
                    this._highlighted = d;
                    this._highlighted._ctx.canvas.style.cursor = "move";
                } else {
                    d.highlighted = false;
                }
            });
        }

        return this._highlighted;
    }

    drop(droppables) {
        let droppable;
        if (droppables[0]) {
            droppable = droppables[0];
        } else if (droppables[1]) {
            droppable = droppables[1];
        }
        if (droppable) {
            if (this._highlighted) {
                if (droppable.isDroppable && droppable.highlighted) {
                    this._highlighted.attach(droppable);
                } else {
                    this._highlighted.reset();
                }

                if (this._highlighted.dragging) {
                    this._highlighted.dragging = false;
                }
            }
        } else {
            if (this._highlighted) {
                this._highlighted.reset();
            }
        }
    }

    draw() {
        this._draggables.forEach(d => {
            d.draw();
        });
        if (this._highlighted) {
            this._highlighted.draw();
        }
    }
}