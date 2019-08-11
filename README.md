# HypnoSpace

HypnoSpace is an original JavaScript project that allows users to upload their own audio files and view a visual that is synchronized to the song.

[HypnoSpace Live!](http://kavyakumar.com/HypnoSpace/)

## Technologies and Challenges 
HypnoSpace utilizes JavaScript, AnalyserNode library, and three.js library.

[AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) was used to retrieve the frequency data calculated by fast fourier transforms for the audio file.

[HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) was then used to draw a corresponding visual for each frequency in the data array.

The [three.js](https://threejs.org/) lirary was used to create a 3D animated background of stars behind the audio visuals. 

Challenges during this project include layering multiple layers of canvas elements and utilizing multiple libraries simultaneously.

### Features

The user can upload their own audio files and watch the visuals change, or click the "Play Demo" button to see a sample song play.

<p align="center">
    <img width="600" height="375" src="hypnospace_demo.gif">
</p>

### Code Snippets


#### Function for drawing each bar in visual (using canvas)
```js
function renderFrame() {
      requestAnimationFrame(renderFrame);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      x = Math.PI/2;
      barHeight = dataArray[0];

      analyser.getByteFrequencyData(dataArray);

      grd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 100);
      grd.addColorStop(0, 'rgba(41, 10, 89, 1.000)');
      grd.addColorStop(0.7, "#b01279");
      grd.addColorStop(1, "#3f0fa6");
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
      
        x += barWidth;
      }
      var maxBarHeight = dataArray[0];
      if (barHeight > maxBarHeight) {
        maxBarHeight = barHeight;
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxBarHeight*1.2, 0, 2 * Math.PI);
      ctx.strokeStyle = '#834ab5';
      ctx.stroke();
    }
    audio.play();
    renderFrame();
  };
```

#### Create animated background with three.js
```js
var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    
    window.container = document.createElement('div');
    container.style.position = 'relative';
    document.body.appendChild(container);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let node = document.querySelectorAll('canvas')[1]
    node.style.position = 'absolute';
    container.appendChild(node);
   

    var starsGeometry = new THREE.Geometry();

    for (var i = 0; i < 10000; i++) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);

        starsGeometry.vertices.push(star);
        starsGeometry.morphAttributes = {};

    }
    var starsMaterial = new THREE.PointsMaterial({
        color: 0x888888
    });

    var starField = new THREE.Points(starsGeometry, starsMaterial);
    
    scene.add(starField);
```