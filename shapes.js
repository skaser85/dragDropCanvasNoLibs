class Shapes {
    constructor(ctx) {
        this._ctx = ctx;
    }

    get ctx() {
        return this._ctx;
    }

    line(x1, y1, x2, y2, options = {
        strokeStyle: "#000000",
        lineWidth: 1,
        dashedLine: false,
        dashedLineLen: 5,
        dashedLineGap: 15
    }) {
        this._ctx.save();
        this._ctx.beginPath();
        if (options.hasOwnProperty("dashedLine")) {
            if(options.dashedLine) {
            this._ctx.setLineDash([options.dashedLineLen, options.dashedLineGap]);
            }
        }
        this._ctx.lineWidth = options.hasOwnProperty("lineWidth") ? options.lineWidth : 1;
        this._ctx.strokeStyle = options.hasOwnProperty("strokeStyle") ? options.strokeStyle : "#000000";
        this._ctx.fillStyle = options.hasOwnProperty("fillStyle") ? options.fillStyle : "#ffffff";
        this._ctx.moveTo(x1, y1);
        this._ctx.lineTo(x2, y2);
        this._ctx.stroke();
        this._ctx.closePath();
        this._ctx.restore();
    }

    rect(x, y, w, h, options = {
        stroke: true,
        fill: false,
        strokeStyle: "#000000",
        fillStyle: "#ffffff",
        lineWidth: 1,
        dashedLine: false,
        dashedLineLen: 5,
        dashedLineGap: 15
    }) {
        this._ctx.save();
        this._ctx.beginPath();
        if (options.hasOwnProperty("dashedLine")) {
            if(options.dashedLine) {
            this._ctx.setLineDash([options.dashedLineLen, options.dashedLineGap]);
            }
        }
        this._ctx.lineWidth = options.hasOwnProperty("lineWidth") ? options.lineWidth : 1;
        this._ctx.strokeStyle = options.hasOwnProperty("strokeStyle") ? options.strokeStyle : "#000000";
        this._ctx.fillStyle = options.hasOwnProperty("fillStyle") ? options.fillStyle : "#ffffff";
        this._ctx.rect(x, y, w, h);
        if (options.hasOwnProperty("stroke") ? options.stroke : true) { this._ctx.stroke(); }
        if (options.hasOwnProperty("fill") ? options.fill : false) { this._ctx.fill(); }
        this._ctx.closePath();
        this._ctx.restore();
    }
}