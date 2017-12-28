function createPool(canvas) {
    let pool = new Droppables;
    pool.addDroppable( new Droppable({
        ctx: canvas.ctx,
        x: 325,//window.innerWidth/2 - (1500/2),
        y: canvas.height - 305,
        w: 1500,
        h: 300,
        fillColors: {
            default: "rgba(0, 0, 0, .25"
        },
        text: "pool"
    }));
    pool.pool = pool.droppables[0];
    return pool;
}