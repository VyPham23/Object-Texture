import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 ); //0.1: closest distance, 1000: farthest distance

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color( 0xffc0cb )

// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'models/cottage.obj',
    // 'models/AAA1.obj',
	// called when resource is loaded
	function ( object ) {

        object.scale.set(0.2, 0.2, 0.2);
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

camera.position.z = 7;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
