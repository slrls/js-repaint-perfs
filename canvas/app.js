var render = function () {

    var databases = ENV.generateData().toArray();

    var canvas = document.getElementById("app");
    var context = canvas.getContext("2d");

    var width = window.innerWidth - 16;

    var columnWidth = width / 7;

    canvas.width = width;
    canvas.height = 37 * databases.length;

    context.moveTo(0, 0);
    var currentY = 0;
    var grey = true;
    for (var index = 0; index < databases.length; index++) {
        var db = databases[index];
        if (grey) {
            context.fillStyle = "#F9F9F9";
        } else {
            context.fillStyle = "#FFFFFF";
        }
        grey = !grey;
        context.strokeStyle = "#808080";
        context.fillRect(0.5, currentY+0.5, width-1, 37);
        context.strokeRect(0.5, currentY+0.5, width-1, 37);

        context.fillStyle = "#000000";
        context.font = "14px Helvetica";
        context.fillText(db.dbname, 8, currentY+25);
        var currentX = columnWidth;
        var queryCount = db.lastSample.queries.length;
        context.fillStyle = "#5cb85c";
        if (queryCount >= 10) {
            context.fillStyle = "#f0ad4e";
        }
        context.fillRect(currentX + 8.5, currentY + 8.5, 20, 20);
        context.fillStyle = "#000000";
        context.font = "10px Helvetica";
        context.fillText('' + db.lastSample.queries.length, currentX+12, currentY+23);

        currentX += columnWidth;
        context.fillStyle = "#000000";
        context.font = "14px Helvetica";
        for (var indexQ = 0; indexQ < db.lastSample.topFiveQueries.length; indexQ++) {
            var q = db.lastSample.topFiveQueries[indexQ];
            if (q.formatElapsed) {

                context.fillText(q.formatElapsed, currentX+8, currentY+25);
            }
            currentX += columnWidth;
        }

        currentY += 37;
    }

    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
};

render();
