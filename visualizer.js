window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    const centerX = (WIDTH/2);
    const centerY = (HEIGHT/2);

    const pi2 = Math.PI*10;

    var barWidth = (pi2 / bufferLength);
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      x = Math.PI/2;
      barHeight = dataArray[0];
      analyser.getByteFrequencyData(dataArray);

      // var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
      // grd.addColorStop(0, "red");
      // grd.addColorStop(1, "white");
      // ctx.fillStyle = grd;
      ctx.fillStyle = "blue";
      
      // ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + (barHeight * Math.cos(x)), centerY + (barHeight * Math.sin(x)));
        ctx.lineTo(centerX + (barHeight * Math.cos(x + barWidth)), centerY + (barHeight * Math.sin(x + barWidth)));
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill()
        // var r = barHeight + (25 * (i/bufferLength));
        // var g = 250 * (i/bufferLength);
        // var b = 50;

        // ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        // ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth;
      }
    }

    audio.play();
    renderFrame();
  };
};