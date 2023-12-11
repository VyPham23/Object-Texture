import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

var skybox;

var create_skybox = function(scene) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var front_texture = new THREE.TextureLoader().load("/divine_ft.jpg");
    var back_texture = new THREE.TextureLoader().load("/divine_bk.jpg");
    var up_texture = new THREE.TextureLoader().load("/divine_up.jpg");
    var down_texture = new THREE.TextureLoader().load("/divine_dn.jpg");
    var right_texture = new THREE.TextureLoader().load("/divine_rt.jpg");
    var left_texture = new THREE.TextureLoader().load("/divine_lf.jpg");

    var materials = [];
    materials.push(new THREE.MeshBasicMaterial({ map: front_texture }));
    materials.push(new THREE.MeshBasicMaterial({ map: back_texture }));
    materials.push(new THREE.MeshBasicMaterial({ map: up_texture }));
    materials.push(new THREE.MeshBasicMaterial({ map: down_texture }));
    materials.push(new THREE.MeshBasicMaterial({ map: right_texture }));
    materials.push(new THREE.MeshBasicMaterial({ map: left_texture }));

    skybox = new THREE.Mesh(geometry, materials);
    scene.add(skybox);
    skybox.position.set(-2, 0, 0);
}

create_skybox(scene);

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

var ground;

var create_ground = function(){
    var geometry = new THREE.PlaneGeometry(1,1,1);
    var grass_texture = new THREE.TextureLoader().load("/grass01.jpg");
    var normal_texture = new THREE.TextureLoader().load("/grass01_n.jpg");
    var disp_texture = new THREE.TextureLoader().load("/grass01_h.jpg");
    var specula_texture = new THREE.TextureLoader().load("/grass01_h.jpg");

    var gr_material = new THREE.MeshPhongMaterial({
        map:grass_texture,
        normalMap: normal_texture,
        displacementMap:disp_texture,
        specularMap:specula_texture,
        specular: 0xffffff,
        shininess: 10
    });

    ground = new THREE.Mesh(geometry,gr_material);
    scene.add(ground);
    ground.position.set(2, 0, 0);

}

create_ground();

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    // Rotate the skybox
    skybox.rotation.x += 0.005;
    skybox.rotation.y += 0.005;
    skybox.rotation.z += 0.005;

    crate.rotation.x += 0.005;
    crate.rotation.y += 0.005;
    crate.rotation.z += 0.005;

    ground.rotation.x += 0.01;
    ground.rotation.y += 0.01;
    ground.rotation.z += 0.01;

    renderer.render(scene, camera);
};

animate();