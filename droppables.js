class Droppables {
    constructor() {
        this._droppables = [];
        this._highlighted = null;
        this._pool = null;
    }

    get highlighted() {
        return this._highlighted;
    }

    get droppables() {
        return this._droppables;
    }

    get pool() {
        return this._pool;
    }

    set pool(value) {
        this._pool = value;
    }

    addDroppable(droppable) {
        this._droppables.push(droppable);
    }

    removeDroppable(droppable) {
        this._droppables = this._droppables.filter(d => {
            return d !== droppable;
        });
    }

    checkForHighlightedDroppable(mx, my) {
        if (this._highlighted) {
            if (!this._highlighted.contains(mx, my)) {
                this._highlighted.highlighted = true;
                this._highlighted = null;
            }
        }

        if (!this._highlighted) {
            this._droppables.forEach(d => {
                if (d.contains(mx, my)) {
                    d._highlighted = true;
                    this._highlighted = d;
                } else {
                    d._highlighted = false;
                }
            });
        }
    }

    update(mx, my, partHighlighted) {
        if (partHighlighted) {
            if (partHighlighted.dragging) {
                // console.log("dragging");
                this.checkForHighlightedDroppable(mx, my);
            } else {
                if (this.highlighted) {
                    this._highlighted.highlighted = false;
                    this._highlighted = null;
                }
            }
        } else {
            if (this.highlighted) {
                this._highlighted.highlighted = false;
                this._highlighted = null;
            }
        }
    }

    draw() {
        this._droppables.forEach(d => {
            d.draw();
        });
    }
}