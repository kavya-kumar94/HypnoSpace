/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./visualizer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./visualizer.js":
/*!***********************!*\
  !*** ./visualizer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

window.onload = function () {
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  file.onchange = function () {
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
    var barWidth = WIDTH / bufferLength * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  }; // var app = app || {};
  // app.init = init;
  // app.animate = animate;
  // // app.play = true;
  // app.animateParticles = animateParticles;
  // var mouseX = 0, mouseY = 0,
  //     windowHalfX = window.innerWidth / 2,
  //     windowHalfY = window.innerHeight / 2;
  // var camera, scene, renderer;
  // function init() {
  //     scene = new THREE.Scene();
  //     var width = window.innerWidth;
  //     var height = window.innerHeight;
  //     var fov = 20;
  //     renderer = new THREE.CanvasRenderer();
  //     renderer.setSize(width, height);
  //     document.body.appendChild(renderer.domElement);
  //     camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
  //     camera.position.set(0, 0, 175);
  //     renderer.setClearColor(0x000000, 1);
  //     var PI2 = Math.PI * 2;
  //     particles = new Array();
  //     for (var i = 0; i <= 2048; i++) {
  //         var material = new THREE.SpriteCanvasMaterial({
  //             color: 0xffffff,
  //             program: function (context) {
  //                 context.beginPath();
  //                 context.arc(0, 0, 0.33, 0, PI2);
  //                 context.fill();
  //             }
  //         });
  //         var particle = particles[i++] = new THREE.Particle(material);
  //         scene.add(particle);
  //     }
  //     function windowResize() {
  //         width = window.innerWidth;
  //         height = window.innerHeight;
  //         windowHalfX = window.innerWidth / 2;
  //         windowHalfY = window.innerHeight / 2;
  //         renderer.setSize(width, height);
  //         camera.aspect = width / height;
  //         camera.updateProjectionMatrix();
  //     }
  //     function onKeyDown(e) {
  //         switch (e.which) {
  //             case 32:
  //                 if (app.play) {
  //                     app.audio.pause();
  //                     app.play = false;
  //                 } else {
  //                     app.audio.play();
  //                     app.play = true;
  //                 }
  //                 break;
  //             case 67:
  //                 if (gui.closed) {
  //                     gui.closed = false;
  //                 }
  //                 else {
  //                     gui.closed = true;
  //                 }
  //                 break;
  //             case 49:
  //                 spiral.spiral = true;
  //                 spiral.wavySpiral = false;
  //                 spiral.circle = false;
  //                 spiral.flower = false;
  //                 break;
  //             case 50:
  //                 spiral.spiral = false;
  //                 spiral.wavySpiral = true;
  //                 spiral.circle = false;
  //                 spiral.flower = false;
  //                 break;
  //             case 51:
  //                 spiral.spiral = false;
  //                 spiral.wavySpiral = false;
  //                 spiral.circle = false;
  //                 spiral.flower = true;
  //                 break;
  //             case 52:
  //                 spiral.spiral = false;
  //                 spiral.wavySpiral = false;
  //                 spiral.circle = true;
  //                 spiral.flower = false;
  //                 break;
  //             case 82:
  //                 spiral.toggleRed = true;
  //                 spiral.toggleGreen = false;
  //                 spiral.toggleBlue = false;
  //                 break;
  //             case 71:
  //                 spiral.toggleRed = false;
  //                 spiral.toggleGreen = true;
  //                 spiral.toggleBlue = false;
  //                 break;
  //             case 66:
  //                 spiral.toggleRed = false;
  //                 spiral.toggleGreen = false;
  //                 spiral.toggleBlue = true;
  //                 break;
  //             case 65:
  //                 spiral.animate = !spiral.animate;
  //                 break;
  //             case 187:
  //                 if (spiral.intensity < 1) {
  //                     spiral.intensity += 0.01;
  //                 }
  //                 break;
  //             case 189:
  //                 if (spiral.intensity > 0.05) {
  //                     spiral.intensity -= 0.01;
  //                 }
  //         }
  //         return false;
  //     }
  //     function onDocumentTouchStart(e) {
  //         if (e.touches.length === 1) {
  //             e.preventDefault();
  //             mouseX = e.touches[0].pageX - windowHalfX;
  //             mouseY = e.touches[0].pageY - windowHalfY;
  //         }
  //     }
  //     function onDocumentTouchMove(e) {
  //         if (e.touches.length === 1) {
  //             e.preventDefault();
  //             mouseX = e.touches[0].pageX - windowHalfX;
  //             mouseY = e.touches[0].pageY - windowHalfY;
  //         }
  //     }
  //     window.addEventListener('resize', windowResize, false);
  //     document.addEventListener('touchstart', onDocumentTouchStart, false);
  //     document.addEventListener('touchmove', onDocumentTouchMove, false);
  //     document.addEventListener('keydown', onKeyDown, false);
  //     // controls = new THREE.OrbitControls( camera, renderer.domElement );
  // }
  // // GUI control panel
  // var GuiControls = function () {
  //     this.intensity = 0.18;
  //     this.toggleRed = true;
  //     this.toggleGreen = false;
  //     this.toggleBlue = false;
  //     this.fov = 35;
  //     this.R = 0.7;
  //     this.G = 0;
  //     this.B = 0.7;
  //     this.radius = 50;
  //     this.a = 0.15;
  //     this.b = 0.20;
  //     this.angle = 11;
  //     this.aWavy = 1.20;
  //     this.bWavy = 0.76;
  //     this.wavyAngle = 2.44;
  //     this.aFlower = 25;
  //     this.bFlower = 0;
  //     this.flowerAngle = 2.86;
  //     this.spiral = false;
  //     this.wavySpiral = true;
  //     this.flower = false;
  //     this.circle = false;
  //     this.animate = true;
  // };
  // var spiral = new GuiControls();
  // var gui = new dat.GUI();
  // gui.closed = true;
  // gui.add(spiral, 'animate').name('ANIMATE');
  // gui.add(spiral, 'intensity', 0.05, 1).name('Intensity');
  // gui.add(spiral, 'fov', 1, 150).name('Zoom Distance');
  // // visualizer type checkboxes
  // gui.add(spiral, 'spiral').name('Spiral').listen().onChange(function () {
  //     spiral.spiral = true;
  //     spiral.wavySpiral = false;
  //     spiral.flower = false;
  //     spiral.circle = false;
  //     spiralFolder.open();
  //     wavySpiralFolder.close();
  //     flowerFolder.close();
  //     circleFolder.close();
  // });
  // gui.add(spiral, 'wavySpiral').name('Wavy Spiral').listen().onChange(function () {
  //     spiral.spiral = false;
  //     spiral.wavySpiral = true;
  //     spiral.flower = false;
  //     spiral.circle = false;
  //     spiralFolder.close();
  //     wavySpiralFolder.open();
  //     flowerFolder.close();
  //     circleFolder.close();
  // });
  // gui.add(spiral, 'flower').name('Flower').listen().onChange(function () {
  //     spiral.spiral = false;
  //     spiral.wavySpiral = false;
  //     spiral.flower = true;
  //     spiral.circle = false;
  //     spiralFolder.close();
  //     wavySpiralFolder.close();
  //     flowerFolder.open();
  //     circleFolder.close();
  // });
  // gui.add(spiral, 'circle').name('Circle').listen().onChange(function () {
  //     spiral.spiral = false;
  //     spiral.wavySpiral = false;
  //     spiral.flower = false;
  //     spiral.circle = true;
  //     spiralFolder.close();
  //     wavySpiralFolder.close();
  //     flowerFolder.close();
  //     circleFolder.open();
  // });
  // // selected visualizer controls folder
  // var spiralFolder = gui.addFolder('Spiral Controls');
  // spiralFolder.add(spiral, 'a', 0, 50).step(0.01).name('Inner Radius');
  // spiralFolder.add(spiral, 'b', 0, 5).step(0.01).name('Outer Radius');
  // spiralFolder.add(spiral, 'angle', 0, 50).step(.01).name('Angle');
  // // spiralFolder.open();
  // var wavySpiralFolder = gui.addFolder('Wavy Spiral Controls');
  // wavySpiralFolder.add(spiral, 'aWavy', 0, 50).step(0.01).name('Inner Radius');
  // wavySpiralFolder.add(spiral, 'bWavy', 0, 3).step(0.01).name('Outer Radius');
  // wavySpiralFolder.add(spiral, 'wavyAngle', 1, 4).step(0.01).name('Angle');
  // wavySpiralFolder.open();
  // var flowerFolder = gui.addFolder('Flower Controls');
  // flowerFolder.add(spiral, 'aFlower', 0, 50).step(0.01).name('Inner Radius');
  // flowerFolder.add(spiral, 'bFlower', 0, 3).step(0.01).name('Outer Radius');
  // flowerFolder.add(spiral, 'flowerAngle', 1, 4).step(0.01).name('Angle');
  // var circleFolder = gui.addFolder('Circle Controls');
  // circleFolder.add(spiral, 'radius', 10, 100).name('Radius');
  // // color emphasis checkbox
  // gui.add(spiral, 'toggleRed').name('Red Emphasis').listen().onChange(function () {
  //     spiral.toggleRed = true;
  //     spiral.toggleGreen = false;
  //     spiral.toggleBlue = false;
  // });
  // gui.add(spiral, 'toggleGreen').name('Green Emphasis').listen().onChange(function () {
  //     spiral.toggleRed = false;
  //     spiral.toggleGreen = true;
  //     spiral.toggleBlue = false;
  // });
  // gui.add(spiral, 'toggleBlue').name('Blue Emphasis').listen().onChange(function () {
  //     spiral.toggleRed = false;
  //     spiral.toggleGreen = false;
  //     spiral.toggleBlue = true;
  // });
  // // color controls
  // var colorFolder = gui.addFolder('Colors');
  // colorFolder.add(spiral, 'R', 0, 1).name('Red').step(0.01);
  // colorFolder.add(spiral, 'G', 0, 1).name('Green').step(0.01);
  // colorFolder.add(spiral, 'B', 0, 1).name('Blue').step(0.01);
  // colorFolder.open();
  // function animate() {
  //     app.animationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(app.animate);
  //     // stats.begin();
  //     animateParticles();
  //     checkVisualizer();
  //     camera.lookAt(scene.position);
  //     renderer.render(scene, camera);
  //     // stats.end();
  // }
  // function animateParticles() {
  //     // Fast Fourier Transform (FFT) used to determine waveform
  //     var timeFrequencyData = new Uint8Array(analyser.fftSize);
  //     var timeFloatData = new Float32Array(analyser.fftSize);
  //     analyser.getByteTimeDomainData(timeFrequencyData);
  //     analyser.getFloatTimeDomainData(timeFloatData);
  //     for (var j = 0; j <= particles.length; j++) {
  //         particle = particles[j++];
  //         if (spiral.toggleRed) {
  //             // forces red by adding the timeFloatData rather than subtracting
  //             var R = spiral.R + (timeFloatData[j]);
  //             var G = spiral.G - (timeFloatData[j]);
  //             var B = spiral.B - (timeFloatData[j]);
  //             particle.material.color.setRGB(R, G, B);
  //         }
  //         else if (spiral.toggleGreen) {
  //             // forces green by adding the timeFloatData rather than subtracting
  //             var R = spiral.R - (timeFloatData[j]);
  //             var G = spiral.G + (timeFloatData[j]);
  //             var B = spiral.B - (timeFloatData[j]);
  //             particle.material.color.setRGB(R, G, B);
  //         }
  //         else if (spiral.toggleBlue) {
  //             // forces blue by adding  the timeFloatData rather than subtracting
  //             var R = spiral.R - (timeFloatData[j]);
  //             var G = spiral.G - (timeFloatData[j]);
  //             var B = spiral.B + (timeFloatData[j]);
  //             particle.material.color.setRGB(R, G, B);
  //         }
  //         else {
  //             particle.material.color.setHex(0xffffff);
  //         }
  //         if (spiral.spiral) {
  //             // Archimedean Spiral
  //             particle.position.x = (spiral.a + spiral.b * ((spiral.angle / 100) * j))
  //                 * Math.sin(((spiral.angle / 100) * j));
  //             particle.position.y = (spiral.a + spiral.b * ((spiral.angle / 100) * j))
  //                 * Math.cos(((spiral.angle / 100) * j));
  //             particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
  //             camera.position.y = 0;
  //         }
  //         else if (spiral.wavySpiral) {
  //             // Archimedean Spiral with sin and cos added respectively to position to create a wavy spiral
  //             // * 5 for starfish?
  //             particle.position.x = (spiral.aWavy + spiral.bWavy * ((spiral.wavyAngle / 100) * j))
  //                 * Math.sin(((spiral.wavyAngle / 100) * j))
  //                 + Math.sin(j / (spiral.wavyAngle / 100));
  //             particle.position.y = (spiral.aWavy + spiral.bWavy * ((spiral.wavyAngle / 100) * j))
  //                 * Math.cos(((spiral.wavyAngle / 100) * j))
  //                 + Math.cos(j / (spiral.wavyAngle / 100));
  //             particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
  //             camera.position.y = 0;
  //         }
  //         else if (spiral.flower) {
  //             particle.position.x = (spiral.aFlower + spiral.bFlower * ((spiral.flowerAngle / 100) * j))
  //                 * Math.cos(((spiral.flowerAngle / 100) * j))
  //                 + Math.sin(j / (spiral.flowerAngle / 100)) * 17;
  //             particle.position.y = (spiral.aFlower + spiral.bFlower * ((spiral.flowerAngle / 100) * j))
  //                 * Math.sin(((spiral.flowerAngle / 100) * j))
  //                 + Math.cos(j / (spiral.flowerAngle / 100)) * 17;
  //             particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
  //             camera.position.y = 0;
  //         }
  //         else if (spiral.circle) {
  //             particle.position.x = Math.sin(j) * (j / (j / spiral.radius));
  //             particle.position.y = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
  //             particle.position.z = Math.cos(j) * (j / (j / spiral.radius));
  //             camera.fov = 35;
  //             camera.position.y = 100;
  //         }
  //     }
  //     // if (!app.play){
  //     //     particle.material.color.setHex(0x000000);
  //     // }
  //     // controls.update();
  //     camera.fov = spiral.fov;
  //     camera.updateProjectionMatrix();
  // }
  // function checkVisualizer() {
  //     if (spiral.animate) {
  //         if (spiral.spiral) {
  //             changeAngle();
  //         }
  //         else if (spiral.wavySpiral) {
  //             changeWavyAngle();
  //         }
  //         else if (spiral.flower) {
  //             changeFlowerAngle();
  //         }
  //         else if (spiral.circle) {
  //             changeCircleRadius();
  //         }
  //     }
  // }
  // app.spiralCounter = true;
  // app.wavySpiralCounter = true;
  // app.circleCounter = true;
  // app.flowerCounter = false;
  // function changeAngle() {
  //     if (app.spiralCounter) {
  //         spiral.angle += 0.0008;
  //         if (spiral.angle >= 13) {
  //             app.spiralCounter = false;
  //         }
  //     }
  //     else {
  //         spiral.angle -= 0.0008;
  //         if (spiral.angle <= 9) {
  //             app.spiralCounter = true;
  //         }
  //     }
  // }
  // function changeWavyAngle() {
  //     if (app.wavySpiralCounter) {
  //         spiral.wavyAngle += 0.000004;
  //         if (spiral.wavyAngle >= 2.48) {
  //             app.wavySpiralCounter = false;
  //         }
  //     }
  //     else {
  //         spiral.wavyAngle -= 0.000006;
  //         if (spiral.wavyAngle <= 2.43) {
  //             app.wavySpiralCounter = true;
  //         }
  //     }
  // }
  // function changeFlowerAngle() {
  //     if (app.flowerCounter) {
  //         spiral.flowerAngle += 0.0000004;
  //         if (spiral.flowerAngle >= 2.87) {
  //             app.flowerCounter = false;
  //         }
  //     }
  //     else {
  //         spiral.flowerAngle -= 0.0000004;
  //         if (spiral.flowerAngle <= 2.85) {
  //             app.flowerCounter = true;
  //         }
  //     }
  // }
  // function changeCircleRadius() {
  //     if (app.circleCounter) {
  //         spiral.radius += 0.05;
  //         if (spiral.radius >= 65) {
  //             app.circleCounter = false;
  //         }
  //     }
  //     else {
  //         spiral.radius -= 0.05;
  //         if (spiral.radius <= 35) {
  //             console.log('hit');
  //             app.circleCounter = true;
  //         }
  //     }
  // }

};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdmlzdWFsaXplci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJmaWxlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImF1ZGlvIiwib25jaGFuZ2UiLCJmaWxlcyIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImxvYWQiLCJwbGF5IiwiY29udGV4dCIsIkF1ZGlvQ29udGV4dCIsImNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSIsImFuYWx5c2VyIiwiY3JlYXRlQW5hbHlzZXIiLCJjYW52YXMiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImN0eCIsImdldENvbnRleHQiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJmZnRTaXplIiwiYnVmZmVyTGVuZ3RoIiwiZnJlcXVlbmN5QmluQ291bnQiLCJjb25zb2xlIiwibG9nIiwiZGF0YUFycmF5IiwiVWludDhBcnJheSIsIldJRFRIIiwiSEVJR0hUIiwiYmFyV2lkdGgiLCJiYXJIZWlnaHQiLCJ4IiwicmVuZGVyRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJnZXRCeXRlRnJlcXVlbmN5RGF0YSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiaSIsInIiLCJnIiwiYiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUgsQ0FyZ0JELEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi92aXN1YWxpemVyLmpzXCIpO1xuIiwid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBcbiAgdmFyIGZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZWZpbGVcIik7XG4gIHZhciBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW9cIik7XG4gIFxuICBmaWxlLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpbGVzID0gdGhpcy5maWxlcztcbiAgICBhdWRpby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVzWzBdKTtcbiAgICBhdWRpby5sb2FkKCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIHZhciBzcmMgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XG4gICAgdmFyIGFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBzcmMuY29ubmVjdChhbmFseXNlcik7XG4gICAgYW5hbHlzZXIuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgIGFuYWx5c2VyLmZmdFNpemUgPSAyNTY7XG5cbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgY29uc29sZS5sb2coYnVmZmVyTGVuZ3RoKTtcblxuICAgIHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuXG4gICAgdmFyIFdJRFRIID0gY2FudmFzLndpZHRoO1xuICAgIHZhciBIRUlHSFQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgdmFyIGJhcldpZHRoID0gKFdJRFRIIC8gYnVmZmVyTGVuZ3RoKSAqIDIuNTtcbiAgICB2YXIgYmFySGVpZ2h0O1xuICAgIHZhciB4ID0gMDtcblxuICAgIGZ1bmN0aW9uIHJlbmRlckZyYW1lKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckZyYW1lKTtcblxuICAgICAgeCA9IDA7XG5cbiAgICAgIGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGRhdGFBcnJheSk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBXSURUSCwgSEVJR0hUKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBiYXJIZWlnaHQgPSBkYXRhQXJyYXlbaV07XG4gICAgICAgIFxuICAgICAgICB2YXIgciA9IGJhckhlaWdodCArICgyNSAqIChpL2J1ZmZlckxlbmd0aCkpO1xuICAgICAgICB2YXIgZyA9IDI1MCAqIChpL2J1ZmZlckxlbmd0aCk7XG4gICAgICAgIHZhciBiID0gNTA7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiKVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoeCwgSEVJR0hUIC0gYmFySGVpZ2h0LCBiYXJXaWR0aCwgYmFySGVpZ2h0KTtcblxuICAgICAgICB4ICs9IGJhcldpZHRoICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhdWRpby5wbGF5KCk7XG4gICAgcmVuZGVyRnJhbWUoKTtcbiAgfTtcblxuICAgIC8vIHZhciBhcHAgPSBhcHAgfHwge307XG4gICAgLy8gYXBwLmluaXQgPSBpbml0O1xuICAgIC8vIGFwcC5hbmltYXRlID0gYW5pbWF0ZTtcbiAgICAvLyAvLyBhcHAucGxheSA9IHRydWU7XG4gICAgLy8gYXBwLmFuaW1hdGVQYXJ0aWNsZXMgPSBhbmltYXRlUGFydGljbGVzO1xuXG4gICAgLy8gdmFyIG1vdXNlWCA9IDAsIG1vdXNlWSA9IDAsXG4gICAgLy8gICAgIHdpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgIC8vICAgICB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cbiAgICAvLyB2YXIgY2FtZXJhLCBzY2VuZSwgcmVuZGVyZXI7XG5cbiAgICAvLyBmdW5jdGlvbiBpbml0KCkge1xuICAgIC8vICAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIC8vICAgICB2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAvLyAgICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIC8vICAgICB2YXIgZm92ID0gMjA7XG5cbiAgICAvLyAgICAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuQ2FudmFzUmVuZGVyZXIoKTtcbiAgICAvLyAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAvLyAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIC8vICAgICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoZm92LCB3aWR0aCAvIGhlaWdodCwgMSwgMTAwMDApO1xuICAgIC8vICAgICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDE3NSk7XG5cbiAgICAvLyAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDAwMDAwMCwgMSk7XG5cbiAgICAvLyAgICAgdmFyIFBJMiA9IE1hdGguUEkgKiAyO1xuICAgIC8vICAgICBwYXJ0aWNsZXMgPSBuZXcgQXJyYXkoKTtcblxuICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyMDQ4OyBpKyspIHtcbiAgICAvLyAgICAgICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVDYW52YXNNYXRlcmlhbCh7XG4gICAgLy8gICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIC8vICAgICAgICAgICAgIHByb2dyYW06IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIDAuMzMsIDAsIFBJMik7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgdmFyIHBhcnRpY2xlID0gcGFydGljbGVzW2krK10gPSBuZXcgVEhSRUUuUGFydGljbGUobWF0ZXJpYWwpO1xuICAgIC8vICAgICAgICAgc2NlbmUuYWRkKHBhcnRpY2xlKTtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIGZ1bmN0aW9uIHdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAvLyAgICAgICAgIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgLy8gICAgICAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgLy8gICAgICAgICB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbiAgICAvLyAgICAgICAgIHdpbmRvd0hhbGZZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICAvLyAgICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgLy8gICAgICAgICBjYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgLy8gICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgZnVuY3Rpb24gb25LZXlEb3duKGUpIHtcbiAgICAvLyAgICAgICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgIC8vICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChhcHAucGxheSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYXBwLmF1ZGlvLnBhdXNlKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhcHAucGxheSA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYXBwLmF1ZGlvLnBsYXkoKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFwcC5wbGF5ID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgICAgICBjYXNlIDY3OlxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZ3VpLmNsb3NlZCkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZ3VpLmNsb3NlZCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZ3VpLmNsb3NlZCA9IHRydWU7XG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICAgICAgY2FzZSA0OTpcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnNwaXJhbCA9IHRydWU7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC53YXZ5U3BpcmFsID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC5jaXJjbGUgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLmZsb3dlciA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgICAgICBjYXNlIDUwOlxuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwuc3BpcmFsID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC53YXZ5U3BpcmFsID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLmNpcmNsZSA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwuZmxvd2VyID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgICAgIGNhc2UgNTE6XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC5zcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLndhdnlTcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLmNpcmNsZSA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwuZmxvd2VyID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICAgICAgY2FzZSA1MjpcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnNwaXJhbCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwud2F2eVNwaXJhbCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwuY2lyY2xlID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLmZsb3dlciA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgICAgICBjYXNlIDgyOlxuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwudG9nZ2xlUmVkID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnRvZ2dsZUdyZWVuID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC50b2dnbGVCbHVlID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgICAgIGNhc2UgNzE6XG4gICAgLy8gICAgICAgICAgICAgICAgIHNwaXJhbC50b2dnbGVSZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnRvZ2dsZUdyZWVuID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnRvZ2dsZUJsdWUgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICAgICAgY2FzZSA2NjpcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnRvZ2dsZVJlZCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwudG9nZ2xlR3JlZW4gPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BpcmFsLnRvZ2dsZUJsdWUgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgICAgICBjYXNlIDY1OlxuICAgIC8vICAgICAgICAgICAgICAgICBzcGlyYWwuYW5pbWF0ZSA9ICFzcGlyYWwuYW5pbWF0ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICAgICAgY2FzZSAxODc6XG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChzcGlyYWwuaW50ZW5zaXR5IDwgMSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgc3BpcmFsLmludGVuc2l0eSArPSAwLjAxO1xuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgICAgIGNhc2UgMTg5OlxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoc3BpcmFsLmludGVuc2l0eSA+IDAuMDUpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNwaXJhbC5pbnRlbnNpdHkgLT0gMC4wMTtcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgZnVuY3Rpb24gb25Eb2N1bWVudFRvdWNoU3RhcnQoZSkge1xuICAgIC8vICAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICAgICAgICAgICAgbW91c2VYID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gd2luZG93SGFsZlg7XG4gICAgLy8gICAgICAgICAgICAgbW91c2VZID0gZS50b3VjaGVzWzBdLnBhZ2VZIC0gd2luZG93SGFsZlk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBmdW5jdGlvbiBvbkRvY3VtZW50VG91Y2hNb3ZlKGUpIHtcbiAgICAvLyAgICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICAgICAgICAgIG1vdXNlWCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHdpbmRvd0hhbGZYO1xuICAgIC8vICAgICAgICAgICAgIG1vdXNlWSA9IGUudG91Y2hlc1swXS5wYWdlWSAtIHdpbmRvd0hhbGZZO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuICAgIC8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Eb2N1bWVudFRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAvLyAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Eb2N1bWVudFRvdWNoTW92ZSwgZmFsc2UpO1xuICAgIC8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAvLyAgICAgLy8gY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyggY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50ICk7XG5cbiAgICAvLyB9XG5cbiAgICAvLyAvLyBHVUkgY29udHJvbCBwYW5lbFxuICAgIC8vIHZhciBHdWlDb250cm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgdGhpcy5pbnRlbnNpdHkgPSAwLjE4O1xuICAgIC8vICAgICB0aGlzLnRvZ2dsZVJlZCA9IHRydWU7XG4gICAgLy8gICAgIHRoaXMudG9nZ2xlR3JlZW4gPSBmYWxzZTtcbiAgICAvLyAgICAgdGhpcy50b2dnbGVCbHVlID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZm92ID0gMzU7XG4gICAgLy8gICAgIHRoaXMuUiA9IDAuNztcbiAgICAvLyAgICAgdGhpcy5HID0gMDtcbiAgICAvLyAgICAgdGhpcy5CID0gMC43O1xuICAgIC8vICAgICB0aGlzLnJhZGl1cyA9IDUwO1xuICAgIC8vICAgICB0aGlzLmEgPSAwLjE1O1xuICAgIC8vICAgICB0aGlzLmIgPSAwLjIwO1xuICAgIC8vICAgICB0aGlzLmFuZ2xlID0gMTE7XG4gICAgLy8gICAgIHRoaXMuYVdhdnkgPSAxLjIwO1xuICAgIC8vICAgICB0aGlzLmJXYXZ5ID0gMC43NjtcbiAgICAvLyAgICAgdGhpcy53YXZ5QW5nbGUgPSAyLjQ0O1xuICAgIC8vICAgICB0aGlzLmFGbG93ZXIgPSAyNTtcbiAgICAvLyAgICAgdGhpcy5iRmxvd2VyID0gMDtcbiAgICAvLyAgICAgdGhpcy5mbG93ZXJBbmdsZSA9IDIuODY7XG4gICAgLy8gICAgIHRoaXMuc3BpcmFsID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMud2F2eVNwaXJhbCA9IHRydWU7XG4gICAgLy8gICAgIHRoaXMuZmxvd2VyID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuY2lyY2xlID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuYW5pbWF0ZSA9IHRydWU7XG4gICAgLy8gfTtcblxuICAgIC8vIHZhciBzcGlyYWwgPSBuZXcgR3VpQ29udHJvbHMoKTtcblxuICAgIC8vIHZhciBndWkgPSBuZXcgZGF0LkdVSSgpO1xuICAgIC8vIGd1aS5jbG9zZWQgPSB0cnVlO1xuICAgIC8vIGd1aS5hZGQoc3BpcmFsLCAnYW5pbWF0ZScpLm5hbWUoJ0FOSU1BVEUnKTtcbiAgICAvLyBndWkuYWRkKHNwaXJhbCwgJ2ludGVuc2l0eScsIDAuMDUsIDEpLm5hbWUoJ0ludGVuc2l0eScpO1xuICAgIC8vIGd1aS5hZGQoc3BpcmFsLCAnZm92JywgMSwgMTUwKS5uYW1lKCdab29tIERpc3RhbmNlJyk7XG5cbiAgICAvLyAvLyB2aXN1YWxpemVyIHR5cGUgY2hlY2tib3hlc1xuICAgIC8vIGd1aS5hZGQoc3BpcmFsLCAnc3BpcmFsJykubmFtZSgnU3BpcmFsJykubGlzdGVuKCkub25DaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBzcGlyYWwuc3BpcmFsID0gdHJ1ZTtcbiAgICAvLyAgICAgc3BpcmFsLndhdnlTcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLmZsb3dlciA9IGZhbHNlO1xuICAgIC8vICAgICBzcGlyYWwuY2lyY2xlID0gZmFsc2U7XG4gICAgLy8gICAgIHNwaXJhbEZvbGRlci5vcGVuKCk7XG4gICAgLy8gICAgIHdhdnlTcGlyYWxGb2xkZXIuY2xvc2UoKTtcbiAgICAvLyAgICAgZmxvd2VyRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gICAgIGNpcmNsZUZvbGRlci5jbG9zZSgpO1xuXG4gICAgLy8gfSk7XG4gICAgLy8gZ3VpLmFkZChzcGlyYWwsICd3YXZ5U3BpcmFsJykubmFtZSgnV2F2eSBTcGlyYWwnKS5saXN0ZW4oKS5vbkNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHNwaXJhbC5zcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLndhdnlTcGlyYWwgPSB0cnVlO1xuICAgIC8vICAgICBzcGlyYWwuZmxvd2VyID0gZmFsc2U7XG4gICAgLy8gICAgIHNwaXJhbC5jaXJjbGUgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gICAgIHdhdnlTcGlyYWxGb2xkZXIub3BlbigpO1xuICAgIC8vICAgICBmbG93ZXJGb2xkZXIuY2xvc2UoKTtcbiAgICAvLyAgICAgY2lyY2xlRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZ3VpLmFkZChzcGlyYWwsICdmbG93ZXInKS5uYW1lKCdGbG93ZXInKS5saXN0ZW4oKS5vbkNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHNwaXJhbC5zcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLndhdnlTcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLmZsb3dlciA9IHRydWU7XG4gICAgLy8gICAgIHNwaXJhbC5jaXJjbGUgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gICAgIHdhdnlTcGlyYWxGb2xkZXIuY2xvc2UoKTtcbiAgICAvLyAgICAgZmxvd2VyRm9sZGVyLm9wZW4oKTtcbiAgICAvLyAgICAgY2lyY2xlRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZ3VpLmFkZChzcGlyYWwsICdjaXJjbGUnKS5uYW1lKCdDaXJjbGUnKS5saXN0ZW4oKS5vbkNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHNwaXJhbC5zcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLndhdnlTcGlyYWwgPSBmYWxzZTtcbiAgICAvLyAgICAgc3BpcmFsLmZsb3dlciA9IGZhbHNlO1xuICAgIC8vICAgICBzcGlyYWwuY2lyY2xlID0gdHJ1ZTtcbiAgICAvLyAgICAgc3BpcmFsRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gICAgIHdhdnlTcGlyYWxGb2xkZXIuY2xvc2UoKTtcbiAgICAvLyAgICAgZmxvd2VyRm9sZGVyLmNsb3NlKCk7XG4gICAgLy8gICAgIGNpcmNsZUZvbGRlci5vcGVuKCk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vIC8vIHNlbGVjdGVkIHZpc3VhbGl6ZXIgY29udHJvbHMgZm9sZGVyXG4gICAgLy8gdmFyIHNwaXJhbEZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1NwaXJhbCBDb250cm9scycpO1xuICAgIC8vIHNwaXJhbEZvbGRlci5hZGQoc3BpcmFsLCAnYScsIDAsIDUwKS5zdGVwKDAuMDEpLm5hbWUoJ0lubmVyIFJhZGl1cycpO1xuICAgIC8vIHNwaXJhbEZvbGRlci5hZGQoc3BpcmFsLCAnYicsIDAsIDUpLnN0ZXAoMC4wMSkubmFtZSgnT3V0ZXIgUmFkaXVzJyk7XG4gICAgLy8gc3BpcmFsRm9sZGVyLmFkZChzcGlyYWwsICdhbmdsZScsIDAsIDUwKS5zdGVwKC4wMSkubmFtZSgnQW5nbGUnKTtcbiAgICAvLyAvLyBzcGlyYWxGb2xkZXIub3BlbigpO1xuXG4gICAgLy8gdmFyIHdhdnlTcGlyYWxGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdXYXZ5IFNwaXJhbCBDb250cm9scycpO1xuICAgIC8vIHdhdnlTcGlyYWxGb2xkZXIuYWRkKHNwaXJhbCwgJ2FXYXZ5JywgMCwgNTApLnN0ZXAoMC4wMSkubmFtZSgnSW5uZXIgUmFkaXVzJyk7XG4gICAgLy8gd2F2eVNwaXJhbEZvbGRlci5hZGQoc3BpcmFsLCAnYldhdnknLCAwLCAzKS5zdGVwKDAuMDEpLm5hbWUoJ091dGVyIFJhZGl1cycpO1xuICAgIC8vIHdhdnlTcGlyYWxGb2xkZXIuYWRkKHNwaXJhbCwgJ3dhdnlBbmdsZScsIDEsIDQpLnN0ZXAoMC4wMSkubmFtZSgnQW5nbGUnKTtcbiAgICAvLyB3YXZ5U3BpcmFsRm9sZGVyLm9wZW4oKTtcblxuICAgIC8vIHZhciBmbG93ZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdGbG93ZXIgQ29udHJvbHMnKTtcbiAgICAvLyBmbG93ZXJGb2xkZXIuYWRkKHNwaXJhbCwgJ2FGbG93ZXInLCAwLCA1MCkuc3RlcCgwLjAxKS5uYW1lKCdJbm5lciBSYWRpdXMnKTtcbiAgICAvLyBmbG93ZXJGb2xkZXIuYWRkKHNwaXJhbCwgJ2JGbG93ZXInLCAwLCAzKS5zdGVwKDAuMDEpLm5hbWUoJ091dGVyIFJhZGl1cycpO1xuICAgIC8vIGZsb3dlckZvbGRlci5hZGQoc3BpcmFsLCAnZmxvd2VyQW5nbGUnLCAxLCA0KS5zdGVwKDAuMDEpLm5hbWUoJ0FuZ2xlJyk7XG5cbiAgICAvLyB2YXIgY2lyY2xlRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQ2lyY2xlIENvbnRyb2xzJyk7XG4gICAgLy8gY2lyY2xlRm9sZGVyLmFkZChzcGlyYWwsICdyYWRpdXMnLCAxMCwgMTAwKS5uYW1lKCdSYWRpdXMnKTtcblxuXG4gICAgLy8gLy8gY29sb3IgZW1waGFzaXMgY2hlY2tib3hcbiAgICAvLyBndWkuYWRkKHNwaXJhbCwgJ3RvZ2dsZVJlZCcpLm5hbWUoJ1JlZCBFbXBoYXNpcycpLmxpc3RlbigpLm9uQ2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgc3BpcmFsLnRvZ2dsZVJlZCA9IHRydWU7XG4gICAgLy8gICAgIHNwaXJhbC50b2dnbGVHcmVlbiA9IGZhbHNlO1xuICAgIC8vICAgICBzcGlyYWwudG9nZ2xlQmx1ZSA9IGZhbHNlO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gZ3VpLmFkZChzcGlyYWwsICd0b2dnbGVHcmVlbicpLm5hbWUoJ0dyZWVuIEVtcGhhc2lzJykubGlzdGVuKCkub25DaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBzcGlyYWwudG9nZ2xlUmVkID0gZmFsc2U7XG4gICAgLy8gICAgIHNwaXJhbC50b2dnbGVHcmVlbiA9IHRydWU7XG4gICAgLy8gICAgIHNwaXJhbC50b2dnbGVCbHVlID0gZmFsc2U7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBndWkuYWRkKHNwaXJhbCwgJ3RvZ2dsZUJsdWUnKS5uYW1lKCdCbHVlIEVtcGhhc2lzJykubGlzdGVuKCkub25DaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBzcGlyYWwudG9nZ2xlUmVkID0gZmFsc2U7XG4gICAgLy8gICAgIHNwaXJhbC50b2dnbGVHcmVlbiA9IGZhbHNlO1xuICAgIC8vICAgICBzcGlyYWwudG9nZ2xlQmx1ZSA9IHRydWU7XG4gICAgLy8gfSk7XG5cbiAgICAvLyAvLyBjb2xvciBjb250cm9sc1xuICAgIC8vIHZhciBjb2xvckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0NvbG9ycycpO1xuICAgIC8vIGNvbG9yRm9sZGVyLmFkZChzcGlyYWwsICdSJywgMCwgMSkubmFtZSgnUmVkJykuc3RlcCgwLjAxKTtcbiAgICAvLyBjb2xvckZvbGRlci5hZGQoc3BpcmFsLCAnRycsIDAsIDEpLm5hbWUoJ0dyZWVuJykuc3RlcCgwLjAxKTtcbiAgICAvLyBjb2xvckZvbGRlci5hZGQoc3BpcmFsLCAnQicsIDAsIDEpLm5hbWUoJ0JsdWUnKS5zdGVwKDAuMDEpO1xuICAgIC8vIGNvbG9yRm9sZGVyLm9wZW4oKTtcblxuXG4gICAgLy8gZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAvLyAgICAgYXBwLmFuaW1hdGlvbkZyYW1lID0gKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSkoYXBwLmFuaW1hdGUpO1xuICAgIC8vICAgICAvLyBzdGF0cy5iZWdpbigpO1xuICAgIC8vICAgICBhbmltYXRlUGFydGljbGVzKCk7XG4gICAgLy8gICAgIGNoZWNrVmlzdWFsaXplcigpO1xuICAgIC8vICAgICBjYW1lcmEubG9va0F0KHNjZW5lLnBvc2l0aW9uKTtcbiAgICAvLyAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIC8vICAgICAvLyBzdGF0cy5lbmQoKTtcbiAgICAvLyB9XG5cbiAgICAvLyBmdW5jdGlvbiBhbmltYXRlUGFydGljbGVzKCkge1xuICAgIC8vICAgICAvLyBGYXN0IEZvdXJpZXIgVHJhbnNmb3JtIChGRlQpIHVzZWQgdG8gZGV0ZXJtaW5lIHdhdmVmb3JtXG4gICAgLy8gICAgIHZhciB0aW1lRnJlcXVlbmN5RGF0YSA9IG5ldyBVaW50OEFycmF5KGFuYWx5c2VyLmZmdFNpemUpO1xuICAgIC8vICAgICB2YXIgdGltZUZsb2F0RGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoYW5hbHlzZXIuZmZ0U2l6ZSk7XG4gICAgLy8gICAgIGFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aW1lRnJlcXVlbmN5RGF0YSk7XG4gICAgLy8gICAgIGFuYWx5c2VyLmdldEZsb2F0VGltZURvbWFpbkRhdGEodGltZUZsb2F0RGF0YSk7XG4gICAgLy8gICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHBhcnRpY2xlcy5sZW5ndGg7IGorKykge1xuICAgIC8vICAgICAgICAgcGFydGljbGUgPSBwYXJ0aWNsZXNbaisrXTtcbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwudG9nZ2xlUmVkKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gZm9yY2VzIHJlZCBieSBhZGRpbmcgdGhlIHRpbWVGbG9hdERhdGEgcmF0aGVyIHRoYW4gc3VidHJhY3RpbmdcbiAgICAvLyAgICAgICAgICAgICB2YXIgUiA9IHNwaXJhbC5SICsgKHRpbWVGbG9hdERhdGFbal0pO1xuICAgIC8vICAgICAgICAgICAgIHZhciBHID0gc3BpcmFsLkcgLSAodGltZUZsb2F0RGF0YVtqXSk7XG4gICAgLy8gICAgICAgICAgICAgdmFyIEIgPSBzcGlyYWwuQiAtICh0aW1lRmxvYXREYXRhW2pdKTtcbiAgICAvLyAgICAgICAgICAgICBwYXJ0aWNsZS5tYXRlcmlhbC5jb2xvci5zZXRSR0IoUiwgRywgQik7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNlIGlmIChzcGlyYWwudG9nZ2xlR3JlZW4pIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBmb3JjZXMgZ3JlZW4gYnkgYWRkaW5nIHRoZSB0aW1lRmxvYXREYXRhIHJhdGhlciB0aGFuIHN1YnRyYWN0aW5nXG4gICAgLy8gICAgICAgICAgICAgdmFyIFIgPSBzcGlyYWwuUiAtICh0aW1lRmxvYXREYXRhW2pdKTtcbiAgICAvLyAgICAgICAgICAgICB2YXIgRyA9IHNwaXJhbC5HICsgKHRpbWVGbG9hdERhdGFbal0pO1xuICAgIC8vICAgICAgICAgICAgIHZhciBCID0gc3BpcmFsLkIgLSAodGltZUZsb2F0RGF0YVtqXSk7XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUubWF0ZXJpYWwuY29sb3Iuc2V0UkdCKFIsIEcsIEIpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZWxzZSBpZiAoc3BpcmFsLnRvZ2dsZUJsdWUpIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBmb3JjZXMgYmx1ZSBieSBhZGRpbmcgIHRoZSB0aW1lRmxvYXREYXRhIHJhdGhlciB0aGFuIHN1YnRyYWN0aW5nXG4gICAgLy8gICAgICAgICAgICAgdmFyIFIgPSBzcGlyYWwuUiAtICh0aW1lRmxvYXREYXRhW2pdKTtcbiAgICAvLyAgICAgICAgICAgICB2YXIgRyA9IHNwaXJhbC5HIC0gKHRpbWVGbG9hdERhdGFbal0pO1xuICAgIC8vICAgICAgICAgICAgIHZhciBCID0gc3BpcmFsLkIgKyAodGltZUZsb2F0RGF0YVtqXSk7XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUubWF0ZXJpYWwuY29sb3Iuc2V0UkdCKFIsIEcsIEIpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KDB4ZmZmZmZmKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwuc3BpcmFsKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gQXJjaGltZWRlYW4gU3BpcmFsXG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IChzcGlyYWwuYSArIHNwaXJhbC5iICogKChzcGlyYWwuYW5nbGUgLyAxMDApICogaikpXG4gICAgLy8gICAgICAgICAgICAgICAgICogTWF0aC5zaW4oKChzcGlyYWwuYW5nbGUgLyAxMDApICogaikpO1xuICAgIC8vICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSAoc3BpcmFsLmEgKyBzcGlyYWwuYiAqICgoc3BpcmFsLmFuZ2xlIC8gMTAwKSAqIGopKVxuICAgIC8vICAgICAgICAgICAgICAgICAqIE1hdGguY29zKCgoc3BpcmFsLmFuZ2xlIC8gMTAwKSAqIGopKTtcbiAgICAvLyAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gKHRpbWVGbG9hdERhdGFbal0gKiB0aW1lRnJlcXVlbmN5RGF0YVtqXSAqIHNwaXJhbC5pbnRlbnNpdHkpO1xuXG4gICAgLy8gICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZWxzZSBpZiAoc3BpcmFsLndhdnlTcGlyYWwpIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBBcmNoaW1lZGVhbiBTcGlyYWwgd2l0aCBzaW4gYW5kIGNvcyBhZGRlZCByZXNwZWN0aXZlbHkgdG8gcG9zaXRpb24gdG8gY3JlYXRlIGEgd2F2eSBzcGlyYWxcblxuICAgIC8vICAgICAgICAgICAgIC8vICogNSBmb3Igc3RhcmZpc2g/XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IChzcGlyYWwuYVdhdnkgKyBzcGlyYWwuYldhdnkgKiAoKHNwaXJhbC53YXZ5QW5nbGUgLyAxMDApICogaikpXG4gICAgLy8gICAgICAgICAgICAgICAgICogTWF0aC5zaW4oKChzcGlyYWwud2F2eUFuZ2xlIC8gMTAwKSAqIGopKVxuICAgIC8vICAgICAgICAgICAgICAgICArIE1hdGguc2luKGogLyAoc3BpcmFsLndhdnlBbmdsZSAvIDEwMCkpO1xuICAgIC8vICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSAoc3BpcmFsLmFXYXZ5ICsgc3BpcmFsLmJXYXZ5ICogKChzcGlyYWwud2F2eUFuZ2xlIC8gMTAwKSAqIGopKVxuICAgIC8vICAgICAgICAgICAgICAgICAqIE1hdGguY29zKCgoc3BpcmFsLndhdnlBbmdsZSAvIDEwMCkgKiBqKSlcbiAgICAvLyAgICAgICAgICAgICAgICAgKyBNYXRoLmNvcyhqIC8gKHNwaXJhbC53YXZ5QW5nbGUgLyAxMDApKTtcbiAgICAvLyAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gKHRpbWVGbG9hdERhdGFbal0gKiB0aW1lRnJlcXVlbmN5RGF0YVtqXSAqIHNwaXJhbC5pbnRlbnNpdHkpO1xuXG4gICAgLy8gICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZWxzZSBpZiAoc3BpcmFsLmZsb3dlcikge1xuICAgIC8vICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSAoc3BpcmFsLmFGbG93ZXIgKyBzcGlyYWwuYkZsb3dlciAqICgoc3BpcmFsLmZsb3dlckFuZ2xlIC8gMTAwKSAqIGopKVxuICAgIC8vICAgICAgICAgICAgICAgICAqIE1hdGguY29zKCgoc3BpcmFsLmZsb3dlckFuZ2xlIC8gMTAwKSAqIGopKVxuICAgIC8vICAgICAgICAgICAgICAgICArIE1hdGguc2luKGogLyAoc3BpcmFsLmZsb3dlckFuZ2xlIC8gMTAwKSkgKiAxNztcbiAgICAvLyAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gKHNwaXJhbC5hRmxvd2VyICsgc3BpcmFsLmJGbG93ZXIgKiAoKHNwaXJhbC5mbG93ZXJBbmdsZSAvIDEwMCkgKiBqKSlcbiAgICAvLyAgICAgICAgICAgICAgICAgKiBNYXRoLnNpbigoKHNwaXJhbC5mbG93ZXJBbmdsZSAvIDEwMCkgKiBqKSlcbiAgICAvLyAgICAgICAgICAgICAgICAgKyBNYXRoLmNvcyhqIC8gKHNwaXJhbC5mbG93ZXJBbmdsZSAvIDEwMCkpICogMTc7XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9ICh0aW1lRmxvYXREYXRhW2pdICogdGltZUZyZXF1ZW5jeURhdGFbal0gKiBzcGlyYWwuaW50ZW5zaXR5KTtcbiAgICAvLyAgICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDA7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNlIGlmIChzcGlyYWwuY2lyY2xlKSB7XG4gICAgLy8gICAgICAgICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IE1hdGguc2luKGopICogKGogLyAoaiAvIHNwaXJhbC5yYWRpdXMpKTtcbiAgICAvLyAgICAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gKHRpbWVGbG9hdERhdGFbal0gKiB0aW1lRnJlcXVlbmN5RGF0YVtqXSAqIHNwaXJhbC5pbnRlbnNpdHkpO1xuICAgIC8vICAgICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBNYXRoLmNvcyhqKSAqIChqIC8gKGogLyBzcGlyYWwucmFkaXVzKSk7XG4gICAgLy8gICAgICAgICAgICAgY2FtZXJhLmZvdiA9IDM1O1xuICAgIC8vICAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMTAwO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIGlmICghYXBwLnBsYXkpe1xuICAgIC8vICAgICAvLyAgICAgcGFydGljbGUubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KDB4MDAwMDAwKTtcbiAgICAvLyAgICAgLy8gfVxuICAgIC8vICAgICAvLyBjb250cm9scy51cGRhdGUoKTtcbiAgICAvLyAgICAgY2FtZXJhLmZvdiA9IHNwaXJhbC5mb3Y7XG4gICAgLy8gICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgLy8gfVxuXG4gICAgLy8gZnVuY3Rpb24gY2hlY2tWaXN1YWxpemVyKCkge1xuICAgIC8vICAgICBpZiAoc3BpcmFsLmFuaW1hdGUpIHtcbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwuc3BpcmFsKSB7XG4gICAgLy8gICAgICAgICAgICAgY2hhbmdlQW5nbGUoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGVsc2UgaWYgKHNwaXJhbC53YXZ5U3BpcmFsKSB7XG4gICAgLy8gICAgICAgICAgICAgY2hhbmdlV2F2eUFuZ2xlKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNlIGlmIChzcGlyYWwuZmxvd2VyKSB7XG4gICAgLy8gICAgICAgICAgICAgY2hhbmdlRmxvd2VyQW5nbGUoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGVsc2UgaWYgKHNwaXJhbC5jaXJjbGUpIHtcbiAgICAvLyAgICAgICAgICAgICBjaGFuZ2VDaXJjbGVSYWRpdXMoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIGFwcC5zcGlyYWxDb3VudGVyID0gdHJ1ZTtcbiAgICAvLyBhcHAud2F2eVNwaXJhbENvdW50ZXIgPSB0cnVlO1xuICAgIC8vIGFwcC5jaXJjbGVDb3VudGVyID0gdHJ1ZTtcbiAgICAvLyBhcHAuZmxvd2VyQ291bnRlciA9IGZhbHNlO1xuXG4gICAgLy8gZnVuY3Rpb24gY2hhbmdlQW5nbGUoKSB7XG4gICAgLy8gICAgIGlmIChhcHAuc3BpcmFsQ291bnRlcikge1xuICAgIC8vICAgICAgICAgc3BpcmFsLmFuZ2xlICs9IDAuMDAwODtcbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwuYW5nbGUgPj0gMTMpIHtcbiAgICAvLyAgICAgICAgICAgICBhcHAuc3BpcmFsQ291bnRlciA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2Uge1xuICAgIC8vICAgICAgICAgc3BpcmFsLmFuZ2xlIC09IDAuMDAwODtcbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwuYW5nbGUgPD0gOSkge1xuICAgIC8vICAgICAgICAgICAgIGFwcC5zcGlyYWxDb3VudGVyID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBmdW5jdGlvbiBjaGFuZ2VXYXZ5QW5nbGUoKSB7XG4gICAgLy8gICAgIGlmIChhcHAud2F2eVNwaXJhbENvdW50ZXIpIHtcbiAgICAvLyAgICAgICAgIHNwaXJhbC53YXZ5QW5nbGUgKz0gMC4wMDAwMDQ7XG4gICAgLy8gICAgICAgICBpZiAoc3BpcmFsLndhdnlBbmdsZSA+PSAyLjQ4KSB7XG4gICAgLy8gICAgICAgICAgICAgYXBwLndhdnlTcGlyYWxDb3VudGVyID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICBzcGlyYWwud2F2eUFuZ2xlIC09IDAuMDAwMDA2O1xuICAgIC8vICAgICAgICAgaWYgKHNwaXJhbC53YXZ5QW5nbGUgPD0gMi40Mykge1xuICAgIC8vICAgICAgICAgICAgIGFwcC53YXZ5U3BpcmFsQ291bnRlciA9IHRydWU7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZnVuY3Rpb24gY2hhbmdlRmxvd2VyQW5nbGUoKSB7XG4gICAgLy8gICAgIGlmIChhcHAuZmxvd2VyQ291bnRlcikge1xuICAgIC8vICAgICAgICAgc3BpcmFsLmZsb3dlckFuZ2xlICs9IDAuMDAwMDAwNDtcbiAgICAvLyAgICAgICAgIGlmIChzcGlyYWwuZmxvd2VyQW5nbGUgPj0gMi44Nykge1xuICAgIC8vICAgICAgICAgICAgIGFwcC5mbG93ZXJDb3VudGVyID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICBzcGlyYWwuZmxvd2VyQW5nbGUgLT0gMC4wMDAwMDA0O1xuICAgIC8vICAgICAgICAgaWYgKHNwaXJhbC5mbG93ZXJBbmdsZSA8PSAyLjg1KSB7XG4gICAgLy8gICAgICAgICAgICAgYXBwLmZsb3dlckNvdW50ZXIgPSB0cnVlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGZ1bmN0aW9uIGNoYW5nZUNpcmNsZVJhZGl1cygpIHtcbiAgICAvLyAgICAgaWYgKGFwcC5jaXJjbGVDb3VudGVyKSB7XG4gICAgLy8gICAgICAgICBzcGlyYWwucmFkaXVzICs9IDAuMDU7XG4gICAgLy8gICAgICAgICBpZiAoc3BpcmFsLnJhZGl1cyA+PSA2NSkge1xuICAgIC8vICAgICAgICAgICAgIGFwcC5jaXJjbGVDb3VudGVyID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICBzcGlyYWwucmFkaXVzIC09IDAuMDU7XG4gICAgLy8gICAgICAgICBpZiAoc3BpcmFsLnJhZGl1cyA8PSAzNSkge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAvLyAgICAgICAgICAgICBhcHAuY2lyY2xlQ291bnRlciA9IHRydWU7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbn07Il0sInNvdXJjZVJvb3QiOiIifQ==