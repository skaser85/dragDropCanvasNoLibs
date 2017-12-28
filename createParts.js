function createParts(canvas, pool) {
    let draggables = new Draggables;
    let partNums = [
        "11221-6B2-A000",
        "13210-5BA-0030",
        "91405-TX4-A000-M2",
        "31200-RDF-X500-C2",
        "28120-RBB-A500",
        "11221-6B2-A000",
        "13210-5BA-0030",
        "91405-TX4-A000-M2",
        "31200-RDF-X500-C2",
        "28120-RBB-A500",
        "11221-6B2-A000",
        "13210-5BA-0030",
        "91405-TX4-A000-M2",
        "31200-RDF-X500-C2",
        "28120-RBB-A500",
        "11221-6B2-A000",
        "13210-5BA-0030",
        "91405-TX4-A000-M2",
        "31200-RDF-X500-C2",
        "28120-RBB-A500"
    ];
    let scale = 100;
    let parts = 20;
    for (let i = 0; i < partNums.length; i++) {
        let dragger = new Draggable({
            ctx: canvas.ctx,
            x: scale + (i * scale),
            y: scale,
            w: scale,
            h: scale,
            text: partNums[i],
            fontSize: 20,
            fontColors: {
                default: "#ffffff"
            }
        });
        draggables.addDraggable(dragger);
        dragger.attach(pool);
    }
    return draggables;
}