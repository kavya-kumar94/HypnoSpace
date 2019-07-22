
function buttonClick() {
//    let nodes = document.querySelectorAll('canvas');
//     if (nodes[0].style.display !== "block") {
//         window.cancelAnimationFrame(window.anim);
//         nodes[0].style.display = "block";
//         nodes[1].style.display = "none";
//     } 

    var audio = document.getElementById("audio");
    audio.src = "music/cucumber_water.mp3";
    audio.load();
    audio.play();
    window.context = new AudioContext();
    // if (window.src === undefined) {
        // Build element
        window.src = context.createMediaElementSource(audio);
    // }
    window.analyser = context.createAnalyser();
    // window.src = src;

    var canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    canvas.style.position = 'absolute';
    var ctx = canvas.getContext("2d");
    container.appendChild(canvas);

    window.src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    const centerX = (WIDTH / 2);
    const centerY = (HEIGHT / 2);

    const pi2 = Math.PI * 10;

    var barWidth = (pi2 / bufferLength);
    var barHeight;
    var x = 0;

    function renderFrame() {
        let frame = requestAnimationFrame(renderFrame);
        window.frame = frame;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        x = Math.PI / 2;
        barHeight = dataArray[0];

        analyser.getByteFrequencyData(dataArray);

        let grd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 100);
        grd.addColorStop(0, 'rgba(41, 10, 89, 1.000)');
        // grd.addColorStop(0.5, 'rgba(255, 124, 0, 1.000)');
        grd.addColorStop(0.7, "#b01279");
        grd.addColorStop(1, "#3f0fa6");
        // grd.addColorStop(0.6, "#8E4142");


        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + (barHeight * Math.cos(x)), centerY + (barHeight * Math.sin(x)));
            ctx.lineTo(centerX + (barHeight * Math.cos(x + barWidth)), centerY + (barHeight * Math.sin(x + barWidth)));
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            ctx.strokeStyle = grd;
            ctx.stroke();

            //Fill Style
            // grd = ctx.createLinearGradient(50, 50, 0, 150, 150);
            // var grd = ctx.createRadialGradient(150, 150, 100, 100, 100, 50);
            // grd.addColorStop(0, "red");
            // grd.addColorStop(1, "green");
            // ctx.fillStyle= "blue";


            // Stroke Style
            // ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i * 5) + ', ' +
            //   Math.floor(255 - 42.5 * i * 10) + ')';
            x += barWidth;
        }
        var maxBarHeight = dataArray[0];
        if (barHeight > maxBarHeight) {
            maxBarHeight = barHeight;
        }
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxBarHeight * 1.2, 0, 2 * Math.PI);
        // ctx.strokeStyle = 'white';
        ctx.strokeStyle = '#834ab5';
        // ctx.strokeStyle = '#b01279';
        ctx.stroke();
    }

    audio.play();
    renderFrame();
}

export default buttonClick;