import * as THREE from 'three';
import buttonClick from './demo';
import renderFrame from './visualizer';
import vizInit from './plane';
    // var audio = document.getElementById("audio");


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var starsGeometry = new THREE.Geometry();

    for (var i = 0; i < 10000; i++) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(1000);
        star.y = THREE.Math.randFloatSpread(1000);
        star.z = THREE.Math.randFloatSpread(1000);

        starsGeometry.vertices.push(star);
        starsGeometry.morphAttributes = {};

    }
    var starsMaterial = new THREE.PointsMaterial({
        color: 0x888888
    });

    var starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);
    
    function animate() {
        let anim = requestAnimationFrame(animate);
        window.anim = anim;
        starField.rotation.x += 0.01;
        starField.rotation.y += 0.01;

        
        let nodes = document.querySelectorAll('canvas');
        if (nodes[1].style.display !== "block") {
            // window.cancelAnimationFrame(window.frame);
            nodes[1].style.display = "block";
            nodes[0].style.display = "none";
        };
        // let oldCanvas = document.getElementById('myCanvas');
        // oldCanvas.style.display = "none";
        renderer.render(scene, camera);
    };
    
    // audio.play();
    // animate();

// export default animate;

document.getElementById("demo").addEventListener("click", buttonClick);
document.getElementById("stars").addEventListener("click", animate);
document.getElementById("plane").addEventListener("click", vizInit);