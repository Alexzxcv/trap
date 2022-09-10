let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");

function drawTriangle() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "transparent";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let height = 1 * Math.cos(Math.PI / 6);
    let left_bot = 44;
    let bot = 536;
    let right_bot = 818;
    let middle = 430;
    let top = 3;

    context.moveTo(left_bot, bot);
    for (let i = 0; i < 31; i++) {

        context.lineTo(left_bot, bot);
        context.lineTo(right_bot, bot);
        context.lineTo(middle, top - height);

        left_bot += 50 / 2;
        bot -= 25 / 2;
        right_bot -= 50 / 2;
        top += 45 / 2;

        var gradient = context.createLinearGradient(180, 0, 600, 0);
        gradient.addColorStop("0", "violet");
        gradient.addColorStop("0.25", "#fc03a9");
        gradient.addColorStop("0.55", "blue");
        gradient.addColorStop("0.85", "#6f03fc");
        gradient.addColorStop("1.0", "red");
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.stroke();
    }
}

drawTriangle();
