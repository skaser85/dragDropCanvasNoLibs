function createFloatingMenu(ctx, row, x, y, title) {
    let buttons = new ButtonMenu({
        ctx: ctx,
        x: x,
        y: y,
        w: 215,
        h: 298,
        title: title
    });

    let buttonYstart = buttons.y + 15;// - 290;
    let buttonXleft = x + 5;
    let buttonXright = buttonXleft + 105;

    //
    // DELETE BUTTON
    //
    buttons.addButton(new Button({
        ctx: ctx,
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
        callback: () => {
            row.deleteItem();
        }
    }));

    buttonYstart += 55;

    //
    // ROW BUTTONS
    //
    let rowColor = "#333333";
    let rowColorHighlight = "#000000";
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: rowColor,
        fillColorHighlighted: rowColorHighlight,
        callback: () => {
            row.addItemLeft("partRow");
        }
    }));
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: rowColor,
        fillColorHighlighted: rowColorHighlight,
        callback: () => {
            row.addItemRight("partRow");
        }
    }));

    buttonYstart += 55;

    //
    // WALKWAY BUTTONS
    //
    let wwColor = "#ffee00";
    let wwColorHighlight = "#ffff00"
    buttons.addButton(new Button({
        ctx: ctx,
        x: buttonXleft,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Walkway Left",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#000000"
        },
        fillColorDefault: wwColor,
        fillColorHighlighted: wwColorHighlight,
        callback: () => {
            row.addItemLeft("ww");
        }
    }));
    buttons.addButton(new Button({
        ctx: ctx,
        x: buttonXright,
        y: buttonYstart,
        w: 100,
        h: 50,
        text: "Add Walkway Right",
        breakAtSpace: true,
        fontSize: 15,
        fontColors: {
            default: "#000000"
        },
        fillColorDefault: wwColor,
        fillColorHighlighted: wwColorHighlight,
        callback: () => {
            row.addItemRight("ww");
        }
    }));

    buttonYstart += 55;

    //
    // HOIST POLE BUTTONS
    //
    let hpColor = "#0066ff";
    let hpColorHighlight = "#0000ff"
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: hpColor,
        fillColorHighlighted: hpColorHighlight,
        callback: () => {
            row.addItemLeft("hp");
        }
    }));
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: hpColor,
        fillColorHighlighted: hpColorHighlight,
        callback: () => {
            row.addItemRight("hp");
        }
    }));

    buttonYstart += 55;

    //
    // BEAM BUTTONS
    //
    let beamColor = "#999999";
    let beamColorHighlight = "#666666";
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: beamColor,
        fillColorHighlighted: beamColorHighlight,
        callback: () => {
            row.addItemLeft("beam");
        }
    }));
    buttons.addButton(new Button({
        ctx: ctx,
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
        fillColorDefault: beamColor,
        fillColorHighlighted: beamColorHighlight,
        callback: () => {
            row.addItemRight("beam");
        }
    }));

    return buttons;
}