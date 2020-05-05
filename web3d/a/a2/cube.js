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
var hex16Color =  0xffffff;  
var globalMat = new THREE.MeshBasicMaterial({color: hex16Color}); 
var test = createOctahedron(1, 1, 1, globalMat);


init() ;   
createShoulder() ;
scene.add(test);   
scene.add(createAxes(2));
renderer.render(scene, camera); 

var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.addEventListener('change', render);
animate(); 

class CShoulder 
{ 
    constructor(shoulder , upperArm , elbow ,lowerArm, wrist, hand)
    {
        this.Shoulder = shoulder; 
        this.UppperArm = upperArm  ;
        this.Elbow = elbow; 
        this.LowerArm = lowerArm;  
        this.Wrist = wrist ; 
        this.Hand = hand;  
    }
}

class CHip
{ 
    constructor(hip, upperLeg ,knee, lowerLeg , ankle , foot)
    {
        this.Hip = hip;  
        this.UpperLeg = upperLeg ; 
        this.Knee = knee; 
        this.LowerLeg = lowerLeg ; 
        this.Ankle = ankle  ;  
        this.Foot = foot;  
    }
}

class CHead 
{ 
    constructor(MHead, MNeck)
    {
        this.head = MHead ;  
        this.neck = MNeck ; 
    }
}

class CSwimmer
{ 
    constructor(RShoulder , LShoulder , RHip, LHip, head)
    {
        this.Torso = new THREE.Object3D(); 
        this.RightShoulder = RShoulder;  
        this.LeftShoulder = LShoulder ; 
        this.RightHip = RHip; 
        this.LeftHip = LHip ; 
        this.MHead = head ; 
        this.Torso.add(this.RightShoulder);
        this.Torso.add(this.LeftShoulder);
        this.Torso.add(this.RightHip);
        this.Torso.add(this.LeftHip);
        this.Torso.add(this.MHead);
    }  
}


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


// returns joint axes object
function createJoint(name){}

// returns a whole arm
function createArm(material){}

// returns a whole leg
function createLeg(material){}

// returns the torso object
function createTorso(material){}

// Uses the other functions to create the swimmer
function createSwimmer(material){}


// returns the head object
function createHead(material)
{
    var head = new CHead() ; 
    head.head = new THREE.geometry();
    head.neck = createJoint("Neck"); 
    
}


// returns Octahedron object
function createOctahedron(sizeX, sizeY, sizeZ, material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0.3,0,0));
    geometry.vertices.push(new THREE.Vector3(0,0.3,0));
    geometry.vertices.push(new THREE.Vector3(0,0,0.5));
    geometry.vertices.push(new THREE.Vector3(0,-0.3,0));
    geometry.vertices.push(new THREE.Vector3(0,0,-0.5)); 
    geometry.vertices.push(new THREE.Vector3(-0.3,0,0)); 
    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(0,2,3));
    geometry.faces.push(new THREE.Face3(0,3,4));
    geometry.faces.push(new THREE.Face3(0,4,1));
    geometry.faces.push(new THREE.Face3(5,1,4));
    geometry.faces.push(new THREE.Face3(5,4,3));
    geometry.faces.push(new THREE.Face3(5,3,2));
    geometry.faces.push(new THREE.Face3(5,2,1));
    geometry.computeFaceNormals();     
    var object = new THREE.Mesh(geometry, material);
    object.name = "Octahedron" ; 
    object.scaleX = sizeX; 
    object.scaleY = sizeY; 
    object.scaleZ = sizeZ;  
    return object;  
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