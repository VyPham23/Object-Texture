import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

var crate;

var create_crate = function() {
    var geometry = new THREE.BoxGeometry(1,1,1);
    var crate_texture = new THREE.TextureLoader().load("/crate1_diffuse.png");
    var bump_map_texture = new THREE.TextureLoader().load("/crate1_bump.png");
    var normal_map_texture = new THREE.TextureLoader().load("/crate1_normal.png");

    var material = new THREE.MeshPhongMaterial({map:crate_texture, bumpMap: bump_map_texture, normalMap: normal_map_texture});
    crate = new THREE.Mesh(geometry, material);
    scene.add(crate);
}

create_crate();

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    crate.rotation.x += 0.005;
    crate.rotation.y += 0.005;
    crate.rotation.z += 0.005;

    renderer.render(scene, camera);
};

animate();