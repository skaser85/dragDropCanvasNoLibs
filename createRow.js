function createRow(canvas, rowNum) {
    let letter = rowNum.substr(0, 1);
    let block = rowNum.substr(1, 1);
    return new RowBlock({
        ctx: canvas.ctx,
        letter: letter,
        block: block,
    });
}