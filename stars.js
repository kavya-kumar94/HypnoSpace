import * as THREE from 'three';
import buttonClick from './demo';
import renderFrame from './visualizer';
import planeActions from './plane';


// window.onload = function () {

    // var file = document.getElementById("thefile");
    // var audio = document.getElementById("audio");
    // console.log("check");

    
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

    //    var geometry = new THREE.IcosahedronGeometry(10, 4);
    //    var material = new THREE.MeshBasicMaterial({
    //        color: 0xffffff,
    //    });
    //    var sphere = new THREE.Mesh(geometry, material);
    //    scene.add(sphere);
       

    // file.onchange = function () {
    //     console.dir(audio);
    //     // let oldCanvas = document.getElementById('myCanvas');
    //     // oldCanvas.style.display = "none";
    //     var files = this.files;
    //     audio.src = URL.createObjectURL(files[0]);
    //     audio.load();
    //     audio.play();

    //     let context = new AudioContext();
    //     let src = context.createMediaElementSource(audio);

    //     var analyser = context.createAnalyser();
    //     var canvas = document.querySelectorAll('canvas')[0];
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     var ctx = canvas.getContext('webgl');

    //     src.connect(analyser);
    //     analyser.connect(context.destination);

    //     analyser.fftSize = 256;

    //     var bufferLength = analyser.frequencyBinCount;
    //     console.log(bufferLength);

    //     var dataArray = new Uint8Array(bufferLength);

    //     var WIDTH = canvas.width;
    //     var HEIGHT = canvas.height;
    //     const centerX = (WIDTH / 2);
    //     const centerY = (HEIGHT / 2);

    //     const pi2 = Math.PI * 10;

    //     var barWidth = (pi2 / bufferLength);
    //     var barHeight;
    //     var x = 0;

    //     function renderFrame() {
    //         requestAnimationFrame(renderFrame);
    //         // debugger;
    //         ctx.enable(ctx.SCISSOR_TEST);
    //         ctx.scissor(0, 0, WIDTH, HEIGHT);
    //         ctx.disable(ctx.SCISSOR_TEST);

    //         // ctx.clearRect(0, 0, WIDTH, HEIGHT);
    //         x = Math.PI / 2;
    //         barHeight = dataArray[0];

    //         analyser.getByteFrequencyData(dataArray);

    //         // grd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 100);
    //         // grd.addColorStop(0, 'rgba(41, 10, 89, 1.000)');
    //         // grd.addColorStop(0.3, 'rgba(255, 124, 0, 1.000)');
    //         // grd.addColorStop(0.6, "#8E4142");

    //         for (var i = 0; i < bufferLength; i++) {
    //             barHeight = dataArray[i];
    //             ctx.beginPath();
    //             ctx.moveTo(centerX, centerY);
    //             ctx.lineTo(centerX + (barHeight * Math.cos(x)), centerY + (barHeight * Math.sin(x)));
    //             ctx.lineTo(centerX + (barHeight * Math.cos(x + barWidth)), centerY + (barHeight * Math.sin(x + barWidth)));

    //             ctx.lineTo(centerX, centerY);
    //             ctx.closePath();
    //             ctx.strokeStyle = 'white';
    //             ctx.stroke();

    //             x += barWidth;
    //         }
    //         var maxBarHeight = dataArray[0];
    //         if (barHeight > maxBarHeight) {
    //             maxBarHeight = barHeight;
    //         }
    //         ctx.beginPath();
    //         ctx.arc(centerX, centerY, maxBarHeight * 1.3, 0, 2 * Math.PI);
    //         ctx.closePath();
    //         ctx.strokeStyle = 'white';
    //         // ctx.strokeStyle = 'rgba(41, 10, 89, 1.000)';
    //         ctx.stroke();

    //         // }
    //     };
    //     audio.play();
    //     renderFrame();
    // };

    function animate() {
        let anim = requestAnimationFrame(animate);
        window.anim = anim;
        starField.rotation.x += 0.01;
        // starField.rotation.y += 0.01;
        // buttonClick();
        // let nodes = document.querySelectorAll('canvas');
        // if (nodes[1].style.display !== "block") {
        //     window.cancelAnimationFrame(window.frame);
        //     nodes[1].style.display = "block";
        //     nodes[0].style.display = "none";
        // };

        renderer.render(scene, camera);
    };
        audio.play();
        // renderFrame();
        animate();
// };

// document.getElementById("demo").addEventListener("click", buttonClick);
// document.getElementById("stars").addEventListener("click", animate);
// document.getElementById("plane").addEventListener("click", planeActions);