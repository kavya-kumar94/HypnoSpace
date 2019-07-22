window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  console.log("check");

  file.onchange = function() {
    console.dir(audio);
    // let oldCanvas = document.getElementById('myCanvas');
    // oldCanvas.style.display = "none";
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    
    let context = new AudioContext();
   
   
    let src = context.createMediaElementSource(audio);
    

    
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    var ctx = canvas.getContext("2d");
    container.appendChild(canvas);


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

    // FTsignal = fft(signal - mean(signal)) / length(signal);
    // [maxpeak, maxpeakindes] = max(abs(FTsignal) * 2);

    // function returnOuterRadius() {
    //   return Math.max(barHeight);
    // }

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      x = Math.PI/2;
      barHeight = dataArray[0];

      // maxBarHeight = Math.max(dataArray);
      analyser.getByteFrequencyData(dataArray);

      grd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 100);
      grd.addColorStop(0, 'rgba(41, 10, 89, 1.000)');
      // grd.addColorStop(0.5, 'rgba(255, 124, 0, 1.000)');
      // grd.addColorStop(0.6, "#8E4142");
      grd.addColorStop(0.7, "#b01279");
      grd.addColorStop(1, "#3f0fa6");
      // ctx.fillStyle = "blue";
      // ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * x) + ', ' +
      //   Math.floor(255 - 42.5 * x * 2) + ')';
      // ctx.fillRect(0, 0, WIDTH, HEIGHT);
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + (barHeight * Math.cos(x)), centerY + (barHeight * Math.sin(x)));
        ctx.lineTo(centerX + (barHeight * Math.cos(x + barWidth)), centerY + (barHeight * Math.sin(x + barWidth)));
        // ctx.fillStyle = grd;
        // ctx.fill();
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
        
        // Old Code
        // var r = barHeight + (25 * (i/bufferLength));
        // var g = 250 * (i/bufferLength);
        // var b = 50;
        // ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        // ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth;
      }
      var maxBarHeight = dataArray[0];
      if (barHeight > maxBarHeight) {
        maxBarHeight = barHeight;
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxBarHeight*1.2, 0, 2 * Math.PI);
      // ctx.strokeStyle = 'white';
      ctx.strokeStyle = '#834ab5';
      ctx.stroke();
    }
    audio.play();
    renderFrame();
  };
};

// export default renderFrame;