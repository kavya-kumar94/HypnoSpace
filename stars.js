import * as THREE from 'three';
import buttonClick from './demo';
import renderFrame from './visualizer';
import planeActions from './plane';


// var audio = document.getElementById("audio");
// audio.src = "music/sunflower.mp3";
// audio.load();

//     window.context = new window.AudioContext();
//     // window.src2 = ctx2.createMediaElementSource(audio);
//     var analyser = context.createAnalyser();



    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // var canvas = document.querySelectorAll('canvas')[1];
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // var context = canvas.getContext("2d");
    // window.src.connect(analyser);
    // analyser.connect(context.destination);

    // analyser.fftSize = 256;

    // var bufferLength = analyser.frequencyBinCount;
    // console.log(bufferLength);

    // var dataArray = new Uint8Array(bufferLength);

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

    // scene.add(group);
       var geometry = new THREE.IcosahedronGeometry(10, 4);
       var material = new THREE.MeshBasicMaterial({
           color: 0xffffff,
       });
       var sphere = new THREE.Mesh(geometry, material);
       scene.add(sphere);
       


    function animate() {
        let anim = requestAnimationFrame(animate);
        window.anim = anim;
        starField.rotation.x += 0.01;
        // starField.rotation.y += 0.01;
        
        let nodes = document.querySelectorAll('canvas');
        if (nodes[1].style.display !== "block") {
            // window.cancelAnimationFrame(window.frame);
            nodes[1].style.display = "block";
            nodes[0].style.display = "none";
        };

        renderer.render(scene, camera);
    };

document.getElementById("demo").addEventListener("click", buttonClick);
document.getElementById("stars").addEventListener("click", animate);
// document.getElementById("plane").addEventListener("click", planeActions);