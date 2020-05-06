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
var hex16Yellow = 0xffff00; 
var yelloMat = new THREE.MeshBasicMaterial({color: hex16Yellow}); 
var globalMat = new THREE.MeshBasicMaterial({color: hex16Color}); 
// var test = createDecahedron(1, 1, 1, globalMat);
// var test = createEye(0.1 , globalMat , "eye");
var test = createHead(1,1,1,
                      1,1,1,
                        globalMat);
 

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
    constructor(MHead, MNeck, leftEye , RightEye)
    {
        this.head = MHead ;  
        this.neck = MNeck ; 
        this.LEye = leftEye;  
        this.REye = RightEye; 
    }
}

class CSwimmer
{ 
    constructor(RShoulder , LShoulder , RHip, LHip, head)
    {
        this.Torso = createDecahedron(1,1,1 ,globalMat); 
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

// returns a whole arm
function createArm(material){}

// returns a whole leg
function createLeg(material){}

// returns the torso object
function createTorso(material){}

// Uses the other functions to create the swimmer
function createSwimmer(material){}



// returns joint axes object
/**
 * Function to Create the Joint(Base on the axes)
 * @param {transform X} sizeX 
 * @param {Transform Y} sizeY 
 * @param {Transform Z} sizeZ 
 * @param {Scale X} scaleX 
 * @param {Scale Y} scaleY 
 * @param {Scale Z} scaleZ 
 * @param {Joint Name} name 
 */
function createJoint(sizeX, sizeY, sizeZ, 
    scaleX, scaleY, scaleZ, 
    name)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var Joint = new THREE.Mesh(geometry, material);

    Joint.add(createAxes(2));
    Joint.position.x = sizeX;  
    Joint.position.y = sizeY; 
    Joint.position.z = sizeZ; 

    Joint.scale.x = scaleX;  
    Joint.scale.y = scaleY; 
    Joint.scale.z = scaleZ;  
    return Joint; 
}

// returns the head object
function createHead(sizeX, sizeY, sizeZ, 
                    scaleX, scaleY, scaleZ, 
                    material)
{
    var Neck = createJoint(0 ,-0.5 ,0 , 
                            0.7 ,0.7 ,0.7 ,
                            "Neck");
    var LEye = createEye(-0.2, 0.0, 0.2, 
                    1, 1 , 1 , 
                    0.1,yelloMat , "LeftEye" );
    var REye = createEye(0.2, 0.0, 0.2, 
                    1, 1 ,1 , 
                    0.1,yelloMat , "RightEye" ); 
    var geometry = new THREE.Geometry(); 
    geometry.vertices.push(new THREE.Vector3(0.5,0,0));
    geometry.vertices.push(new THREE.Vector3(0,0.5,0));
    geometry.vertices.push(new THREE.Vector3(0,0,0.5));
    geometry.vertices.push(new THREE.Vector3(0,-0.5,0));
    geometry.vertices.push(new THREE.Vector3(0,0,-0.5)); 
    geometry.vertices.push(new THREE.Vector3(-0.5,0,0)); 
    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(0,2,3));
    geometry.faces.push(new THREE.Face3(0,3,4));
    geometry.faces.push(new THREE.Face3(0,4,1));
    geometry.faces.push(new THREE.Face3(5,1,4));
    geometry.faces.push(new THREE.Face3(5,4,3));
    geometry.faces.push(new THREE.Face3(5,3,2));
    geometry.faces.push(new THREE.Face3(5,2,1));
    geometry.computeFaceNormals();     
    var MHead = new THREE.Mesh(geometry, material);
    MHead.name = "Head" ;  
    MHead.position.x = sizeX; 
    MHead.position.y = sizeY; 
    MHead.position.z = sizeZ;   
    MHead.scale.x = scaleX;  
    MHead.scale.y = scaleY;  
    MHead.scale.z = scaleZ;   
    MHead.add(Neck);//TODO : tmp variable delete it
    MHead.add(LEye);
    MHead.add(REye);
    return MHead;  
}

function createEye(PosX , PosY, PosZ ,
                   ScaleX , ScaleY , ScaleZ 
                   , raidus, material, name)
{
    var geometry = new THREE.SphereGeometry( raidus, 32, 32 );
    var object = new THREE.Mesh(geometry, material);
    object.name = name ;
    object.position.x = PosX; 
    object.position.y = PosY; 
    object.position.z = PosZ;  
    object.scale.x = ScaleX;  
    object.scale.y = ScaleY;  
    object.scale.z = ScaleZ; 

    return object;  
}



// returns decahedron object
function createDecahedron(sizeX, sizeY, sizeZ, material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0,1,0));
    geometry.vertices.push(new THREE.Vector3(0.9510,0.3090,0.0));
    geometry.vertices.push(new THREE.Vector3(0.5877,-0.8090,0.0));
    geometry.vertices.push(new THREE.Vector3(-0.5877,-0.8090,0.0));
    geometry.vertices.push(new THREE.Vector3(-0.9510,0.3090,0.0)); 
    geometry.vertices.push(new THREE.Vector3(0,0,0));  
    geometry.vertices.push(new THREE.Vector3(0,0,-0.5)); 
    geometry.vertices.push(new THREE.Vector3(0,0,0.5)); 
    /*Center Decahedron */
    geometry.faces.push(new THREE.Face3(0 , 4 , 5));
    geometry.faces.push(new THREE.Face3(0 , 5 , 1));
    geometry.faces.push(new THREE.Face3(1 , 5 , 2));
    geometry.faces.push(new THREE.Face3(2 , 5 , 3));
    geometry.faces.push(new THREE.Face3(3 , 5 , 4));
    /*back Decahedron */
    geometry.faces.push(new THREE.Face3(4 , 6 , 3));
    geometry.faces.push(new THREE.Face3(0 , 6 , 4));
    geometry.faces.push(new THREE.Face3(1 , 6 , 0));
    geometry.faces.push(new THREE.Face3(2 , 6 , 1));
    geometry.faces.push(new THREE.Face3(3 , 6 , 2));
    /*Front Dechaedron */
    geometry.faces.push(new THREE.Face3(3 , 7 , 4));
    geometry.faces.push(new THREE.Face3(4 , 7 , 0));
    geometry.faces.push(new THREE.Face3(0 , 7 , 1));
    geometry.faces.push(new THREE.Face3(1 , 7 , 2));
    geometry.faces.push(new THREE.Face3(2 , 7 , 3));   
    geometry.computeFaceNormals();     
    var object = new THREE.Mesh(geometry, material);
    object.name = "Octahedron" ; 
    object.scale.x = sizeX; 
    object.scale.y = sizeY; 
    object.scale.z = sizeZ;  
    return object;  
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
    object.scale.x = sizeX; 
    object.scale.y = sizeY; 
    object.scale.z = sizeZ;  
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
    object.scale.x = scaleX ; 
    object.scale.y = scaleY;  
    object.scale.z = scaleZ;  
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