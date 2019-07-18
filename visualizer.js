window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
  // audio.onload = function() {
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
    var ctx = canvas.getContext("2d"), grd;

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
      
      grd = ctx.createRadialGradient(150, 150, 0, 150, 150, 150);
      grd.addColorStop(0, "red");
      grd.addColorStop(0.2, "white");
      grd.addColorStop(0.7, "green");
      // ctx.fillStyle = "blue";
      // ctx.strokeStyle = 'rgb(102, 204, 0)';
      ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * x) + ', ' +
        Math.floor(255 - 42.5 * x * 2) + ')';
      
      // ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];


        
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + (barHeight * Math.cos(x)), centerY + (barHeight * Math.sin(x)));
        ctx.lineTo(centerX + (barHeight * Math.cos(x + barWidth)), centerY + (barHeight * Math.sin(x + barWidth)));
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        
        //Fill Style
        ctx.fillStyle = grd;
        // ctx.fillStyle= "blue";
        ctx.fill();


        // Stroke Style
        // ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i * 5) + ', ' +
        //   Math.floor(255 - 42.5 * i * 10) + ')';
        // ctx.stroke()

        // Old Code
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