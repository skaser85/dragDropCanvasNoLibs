function createMenu(canvas, row, x, y, title, dropShadow = false) {
    let buttons = new ButtonMenu({
        ctx: canvas.ctx,
        x: x,
        y: y,
        w: 320,
        h: 298,
        title: title,
        hasDropShadow: dropShadow
    });

    let buttonYstart = buttons.y + 15;// - 290;
    let buttonXleft = x + 5;
    let buttonXcenter = buttonXleft + 105;
    let buttonXright = buttonXcenter + 105;

    //
    // DELETE BUTTON
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Delete Item",
        breakAtSpace: true,
        fontColors: {
            default: "#000000"
        },
        fillColorDefault: "#ff6666",
        fillColorHighlighted: "#ff0000",
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        callback: () => {
            row.deleteItem();
        }
    }));
    //
    // ADD PART BUTTON
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Part",
        breakAtSpace: true,
        fontColors: {
            default: "#000000"
        },
        fillColorDefault: "#00aa00",
        fillColorHighlighted: "#00ff00",
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        callback: () => {
            let dragger = new Draggable({
                ctx: canvas.ctx,
                x: 100,
                y: 100,
                w: 100,
                h: 100,
                text: "test part",
                fontSize: 20,
                fontColors: {
                    default: "#ffffff"
                }
            });
            canvas.parts.addDraggable(dragger);
            dragger.attach(canvas.pool);
        }
    }));

    buttonYstart += 55;

    //
    // ROW BUTTONS
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Row Left",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemLeft("partRow");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXcenter,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Row",
        fontColors: {
            default: "#000000"
        },
        breakAtSpace: true,
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        callback: () => {
            row.addItem("partRow");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Row Right",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemRight("partRow");
        }
    }));

    buttonYstart += 55;

    //
    // WALKWAY BUTTONS
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Walkway Left",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemLeft("ww");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXcenter,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Walkway",
        breakAtSpace: true,
        fontColors: {
            default: "#000000"
        },
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        callback: () => {
            row.addItem("ww");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Walkway Right",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemRight("ww");
        }
    }));

    buttonYstart += 55;

    //
    // HOIST POLE BUTTONS
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Hoist Pole Left",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemLeft("hp");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXcenter,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Hoist Pole",
        breakAtSpace: true,
        fontSize: 15,
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        fontColors: {
            default: "#000000"
        },
        callback: () => {
            row.addItem("hp");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Hoist Pole Right",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemRight("hp");
        }
    }));

    buttonYstart += 55;

    //
    // BEAM BUTTONS
    //
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Beam Left",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemLeft("beam");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXcenter,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Beam",
        breakAtSpace: true,
        hasDropShadow: true,
        dropShadowColors: { default: "#ffffff" },
        fontColors: {
            default: "#000000"
        },
        callback: () => {
            row.addItem("beam");
        }
    }));
    buttons.addButton(new Button({
        ctx: canvas.ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Beam Right",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#ffffff"
        },
        fillColorDefault: "#0066ff",
        fillColorHighlighted: "#0000ff",
        hasDropShadow: true,
        callback: () => {
            row.addItemRight("beam");
        }
    }));

    return buttons;
}