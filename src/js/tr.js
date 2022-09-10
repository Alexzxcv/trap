let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");

let arroyDxy = [
    { x: -25, y: -13 },
    { x: 0, y: 22 },
    { x: 25, y: -13 },
];

let points = [
    { x: 44, y: 536 },
    { x: 818, y: 536 },
    { x: 430, y: 3 },
    { x: 60, y: 523 },
];

let stash = [
    { x: 818, y: 536 },
    { x: 430, y: 3 },
    { x: 60, y: 523 },
];

for (let i = 0; i < 30; i++) {
    points.push({
        x:stash[0].x += arroyDxy[0].x,
        y:stash[0].y += arroyDxy[0].y,
    });
    points.push({
        x:stash[1].x += arroyDxy[1].x,
        y:stash[1].y += arroyDxy[1].y,
    });
    points.push({
        x:stash[2].x += arroyDxy[2].x,
        y:stash[2].y += arroyDxy[2].y,
    });
}

function drawTriangle() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "transparent";
    context.fillRect(0, 0, canvas.width, canvas.height);

    function createCoords(points) {
        const coords = [];

        for (let i = 1; i < points.length; i++) {
            const
                p0 = points[i - 1],     //нулевой поинт
                p1 = points[i],			//конечный поинт
                dx = p1.x - p0.x,		//определение шага x
                dy = p1.y - p0.y,		//определение шага y
                steps = Math.max(Math.abs(dx), Math.abs(dy)) / 20; //щаг всей линии

            for (let j = 0; j < steps; j++) {
                coords.push({
                    x: p0.x + dx * j / steps,
                    y: p0.y + dy * j / steps,
                });
                
            }
        }
        return coords;
    }

    (function animate(coords, index) {
        
        if (index === coords.length) {
            return;
        }

        var gradient = context.createLinearGradient(180, 0, 600, 0);
        gradient.addColorStop("0", "violet");
        gradient.addColorStop("0.25", "#fc03a9");
        gradient.addColorStop("0.55", "blue");
        gradient.addColorStop("0.85", "#6f03fc");
        gradient.addColorStop("1.0", "red");
        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(coords[index - 1].x, coords[index - 1].y);
        context.lineTo(coords[index].x, coords[index].y);
        context.stroke();

        requestAnimationFrame(animate.bind(null, coords, index + 1));

    })(createCoords(points), 1);

}

$('#button').click(function(){
    drawTriangle()
    this.style.opacity = 0;
    $('audio').attr("autoplay","true");
});
