/**
 * cube.js 
 * A simple Three.js program which draws a cube
 */

"use strict"; 
var scene ; 
var camera;
var renderer;  
var shoulder = new THREE.Object3D();
shoulder.name = "shoulder";
shoulder.rotation.z = Math.PI / 6;

init() ;   
createShoulder() ;
// scene.add(shoulder);

/**
 * Create the light
 */
/**Ambient */
const color = 0xFFFFFF;
const intensity = 0.2;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);
/**Specualr */
var pointLight  = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 5);
pointLight  = new THREE.PointLight(0xffffff);
scene.add(pointLight);

 // Cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.MeshLambertMaterial({
            color: 0xffffff
        }));
cube.position.set(0, 100, 0);
scene.add(cube);
// var torus_geometry = new THREE.TorusGeometry( 4, 0, 5, 7 ); 
// var color = new THREE.Color("rgb(255, 0, 0)");  
// var torus_material = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0xffffff , wireframe: false});
// var torus = new THREE.Mesh( torus_geometry, torus_material );
// scene.add( torus );
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshPhongMaterial( {color: 0xffff00, specular: 0xffffff ,wireframe : false} );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
const cubeSize = 1;
const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
const mesh = new THREE.Mesh(cubeGeo, cubeMat);
mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
scene.add(mesh);

scene.add(createAxes(2));
renderer.render(scene, camera); 

var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.addEventListener('change', render);
animate();

function render() {
    renderer.render(scene, camera); 
}

function animate() {
    render(); 
    requestAnimationFrame(animate);
    controls.update();
}

function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .01, 1000);

//var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    camera.position.z = 2; 
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x404040, 1);	// grey background 
    document.body.appendChild(renderer.domElement); 
    // Output to the console the threejs version
    console.log("threejs version:" + THREE.REVISION);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
} 

function createShoulder() 
{ 
    // Upper arm
    var geometry = new THREE.BoxGeometry(2, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var upperArm = new THREE.Mesh(geometry, material);
    upperArm.name = "upperArm";
    upperArm.position.x = 1;
    upperArm.add(createAxes(2));
    

    var elbow = new THREE.Mesh();  
    elbow.position.x = 1; 
    elbow.add(createAxes(2));

    upperArm.add(elbow);
    geometry = new THREE.BoxGeometry(2, 1, 1);
    material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var lowerArm = new THREE.Mesh(geometry, material);
    lowerArm.name = "upperArm";
    lowerArm.position.x = 0.5;
    lowerArm.rotation.z = Math.PI / 10 ; 
    lowerArm.add(createAxes(2));
    elbow.add(lowerArm);
    
    // Add upper arm as child of shoulder 
    shoulder.add(upperArm);
    shoulder.add(createAxes(2));  
}

// 0xffff00
function createCube(scaleX , scaleY, scaleZ,  
                    hex16Color , isWireFrameOn)
{ 
    // A square using vertex coordinates and face indexes
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, -1, 0));
    geometry.vertices.push(new THREE.Vector3(1, -1, 0));
    geometry.vertices.push(new THREE.Vector3(1, 1, 0));
    geometry.vertices.push(new THREE.Vector3(-1, 1, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.computeFaceNormals();
    var material = new THREE.MeshBasicMaterial({color: hex16Color}); 
    var object = new THREE.Mesh(geometry, material); 
    object.rotation.z = Math.PI / 4 ; 
    object.material.wireframe = isWireFrameOn ;   
    object.scaleX = scaleX ; 
    object.scaleY = scaleY;  
    object.scaleZ = scaleZ;  
    return object;  
}  

function handleKeyDown(event)
{
    switch (event.keyCode) {
    case 37:
        scene.rotation.z += 1 * Math.PI / 180;
        break;
    case 39:
        scene.rotation.z -= 1 * Math.PI / 180;
        break;
    
    }
}
function handleKeyUp(event)
{
    // Details go here
}