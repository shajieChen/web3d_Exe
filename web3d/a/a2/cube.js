/**
 * cube.js 
 * A simple Three.js program which draws a cube
 */

"use strict"; 

/* ----------------------- Global Variable Declartion ----------------------- */
var scene ; 
var camera;
var renderer;  
var shoulder = new THREE.Object3D();
shoulder.name = "shoulder";
shoulder.rotation.z = Math.PI / 6;
var hex16Color =  0xffffff;  
var hex16Yellow = 0xffff00; 
var hex16Red = 0xff0000;
var yelloMat = new THREE.MeshLambertMaterial({color: hex16Yellow}); 
var whiteMat = new THREE.MeshLambertMaterial({color: hex16Color}); 
var redMat = new THREE.MeshLambertMaterial({color: hex16Red}); 
var globalMat = yelloMat; 
var gloIsWireFrameOn = true; 
 

/* ---------------------------- class Declartion ---------------------------- */
class CShoulder 
{ 
    constructor(Arm ,shoulder , upperArm , elbow ,lowerArm, wrist, hand)
    {
        this.Arm = Arm; 
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
    constructor(Leg , hip, upperLeg ,knee, lowerLeg , ankle , foot)
    {
        this.Leg = Leg;  
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
    constructor(Torso, RShoulder , LShoulder , RHip, LHip, head)
    {  
        this.RightShoulder = RShoulder;  
        this.LeftShoulder = LShoulder ; 
        this.RightHip = RHip; 
        this.LeftHip = LHip ; 
        this.MHead = head ; 
        Torso.add(this.RightShoulder);
        Torso.add(this.LeftShoulder);
        Torso.add(this.RightHip);
        Torso.add(this.LeftHip);
        Torso.add(this.MHead);
        this.Torso = Torso ;  
    }  
}


/* ---------------------------- Swimmer Component --------------------------- */
/**
 * Global Swimmer Component
 */
let cLeftShoulder = new CShoulder();  
let cRightShoulder = new CShoulder();
let cLeftHip = new CHip() ; 
let cRightHip = new CHip() ; 
let cMHead = new CHead(); 
let cSwimmer = {}; 

/* ----------------------------- Object Creation ---------------------------- */ 
cMHead = createHead(0,1.5,0,
                      1,1,1,
                      0,0,0 , 
                      yelloMat);  
cLeftHip = createLeg(0.5877 , -0.8090 , 0.0 , 
                        1.0 , 1.0, 1.0,
                        1.57 , 0.0, 0.0 , yelloMat); 
cRightHip = createLeg(-0.5877 , -0.8090 , 0.0 , 
                        1.0 , 1.0, 1.0,
                        1.57 , 0.0, 0.0 , yelloMat); 
var testBody = createTorso(0, 0 , 0 , 
                            1, 1, 1, 
                            0 , 0 ,0, 
                            yelloMat); 
cRightShoulder = createArm(0.9510,0.3090, 0 ,
                            1, 1,1, 
                            0, 0 ,0 ,
                            yelloMat);  
 cLeftShoulder =  createArm(-0.9510,0.3090, 0 ,
                            1, 1,1, 
                            0, 0 ,3.14 ,
                            yelloMat);  
init() ;   
// createShoulder() ;
scene.add(cLeftHip.Leg);
scene.add(cRightHip.Leg);
scene.add(cMHead.head);    
scene.add(testBody);
scene.add(cRightShoulder.Arm); 
scene.add(cLeftShoulder.Arm);
scene.add(createAxes(2)); 



/* ------------------------------ Light Setting ------------------------------ */
/**Ambient Light */
const color = 0xFFFFFF;
const intensity = 0.2;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);
/**Point Light */
var pointLight  = new THREE.DirectionalLight(0xffffff);
pointLight.position.set(0.1, 0.1, 0.1); 
scene.add(pointLight); 

/* ------------------------------- Rendering ------------------------------- */
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



// Uses the other functions to create the swimmer
function createSwimmer(sizeX, sizeY, sizeZ, 
    scaleX, scaleY, scaleZ, material)
    {}


// returns the torso object BODY
function createTorso(
                    PosX, PosY, PosZ, 
                    scaleX, scaleY, scaleZ,
                    rotX, rotY, rotZ,   
                    material)
{
    /*Body*/ 
    var geometry = new THREE.Geometry();
    var Torso = new THREE.Mesh(geometry , material); 
    /*Center */
    Torso.add(createAxes(2));
    
    var center = createDecahedron(0.0 , 0.0, 0.0 , 
                                1.0 , 1.0, 1.0, 
                                0,  0 , 0 ,
                                material);
    Torso.add(center);
    Torso.name = "Body" ;  

    //Position Setting
    Torso.position.x = PosX;  
    Torso.position.y = PosY; 
    Torso.position.z = PosZ;
    
    //Rotation Setting
    Torso.rotation.x = rotX;  
    Torso.rotation.y = rotY;  
    Torso.rotation.z = rotZ;

    //Scale Setting 
    Torso.scale.x = scaleX; 
    Torso.scale.y = scaleY; 
    Torso.scale.z = scaleZ; 

    return Torso ; 
}

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
function createJoint(PosX , PosY, PosZ, 
    scaleX, scaleY, scaleZ, 
    rotX, rotY, rotZ,
    name)
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var Joint = new THREE.Mesh(geometry, material);

    Joint.add(createAxes(1));
    Joint.position.x = PosX;  
    Joint.position.y = PosY; 
    Joint.position.z = PosZ; 

    Joint.scale.x = scaleX;  
    Joint.scale.y = scaleY; 
    Joint.scale.z = scaleZ;  

    Joint.rotation.x = rotX;  
    Joint.rotation.y = rotY; 
    Joint.rotation.z = rotZ;  

    Joint.name = name;  

    return Joint; 
}

// returns the head object
function createHead(sizeX, sizeY, sizeZ, 
                    scaleX, scaleY, scaleZ, 
                    rotX, rotY, rotZ,
                    material)
{
    var Neck = createJoint(0 ,-0.5 ,0 , 
                            0.7 ,0.7 ,0.7 ,
                            0 , 0 , 0 ,
                            "Neck");
    var LEye = createEye(-0.2, 0.0, 0.2, 
                    1, 1 , 1 , 
                    0.1,redMat , "LeftEye" );
    var REye = createEye(0.2, 0.0, 0.2, 
                    1, 1 ,1 , 
                    0.1,redMat , "RightEye" ); 
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

    MHead.rotation.x = rotX;  
    MHead.rotation.y = rotY;
    MHead.rotation.z = rotZ;

    /*Add it to sub child */
    MHead.add(Neck);
    MHead.add(LEye);
    MHead.add(REye);

    cMHead.head = MHead;  
    cMHead.neck = Neck;  
    cMHead.LEye = LEye ; 
    cMHead.REye = REye;  
    return cMHead;  
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
function createDecahedron(PosX, PosY, PosZ,
                         scaleX, scaleY, scaleZ,
                         RotX , RotY, RotZ,  
                         material)
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
    /*Position Setting */
    object.position.x = PosX; 
    object.position.y = PosY; 
    object.position.z = PosZ; 
    /*Scale Setting */
    object.scale.x = scaleX; 
    object.scale.y = scaleY; 
    object.scale.z = scaleZ;  
    /*Rotation Setting */
    object.rotation.x = RotX; 
    object.rotation.y = RotY; 
    object.rotation.z = RotZ;  

    return object;  
}

// returns Octahedron object
function createOctahedron(PosX , PosY, PosZ,
                         scaleX, scaleY, scaleZ,
                         rotX ,rotY, rotZ, 
                         material)
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

    object.scale.x = scaleX; 
    object.scale.y = scaleY; 
    object.scale.z = scaleZ;  

    object.position.x = PosX;  
    object.position.y = PosY;  
    object.position.z = PosZ;
    
    object.rotation.x = rotX;  
    object.rotation.y = rotY;  
    object.rotation.z = rotZ; 

    return object;  
}


// returns a whole arm
function createArm(PosX, PosY, PosZ, 
    ScaleX, ScaleY, ScaleZ,
    RotX , RotY , RotZ,material)
{
    var resultArm = {}; 
    var Arm = new THREE.Object3D();
    var Shoulder = {} ;
    var UpperArm = {} ; 
    var Elbow = {}    ; 
    var ForeArm = {}  ; 
    var Wrist = {}    ; 
    var Hand = {}     ; 
    /*Shoulder Creation */
    Shoulder = createJoint(
                        0, 0, 0,
                        1, 1, 1,
                        0, 0 ,0 ,
                        "Shoulder");
    /*Upper Arm */
    UpperArm = createOctahedron(0.5, 0 , 0.0 , 
                        1,1, 1, 
                        0, 1.57,0, 
                        material) ; 
    /*Elbow */
    Elbow = createJoint(1.0,0, 0,
                        1,1,1,
                        0, 0, 0, 
                        material);
    /*ForeArm */
    ForeArm = createOctahedron(0.5, 0 , 0.0 , 
                        1,1, 1, 
                        0, 1.57,0, 
                        material);
    /*Wirst */
    Wrist = createJoint(1.0, 0.0 ,0.0, 
                        1.0 , 1.0 , 1.0,
                        0 , 0, 0, 
                        material);
    /*Hand */
    Hand = createRectangle(0.5 , 0.0 , 0.0 , 
                            1, 1, -1, 
                            0, 1.57, 0 , 
                            material);
    Arm.add(Shoulder);
    Shoulder.add(UpperArm);
    Shoulder.add(Elbow);
    Elbow.add(ForeArm);
    Elbow.add(Wrist);
    Wrist.add(Hand);

    Arm.position.x = PosX;  
    Arm.position.y = PosY; 
    Arm.position.z = PosZ;
    
    Arm.scale.x = ScaleX; 
    Arm.scale.y = ScaleY; 
    Arm.scale.z = ScaleZ; 

    Arm.rotation.x = RotX; 
    Arm.rotation.y = RotY; 
    Arm.rotation.z = RotZ; 
    
    resultArm = new CShoulder(Arm, Shoulder , UpperArm , 
                            Elbow,  ForeArm , Wrist , Hand);

    return resultArm ; 

}
// returns a whole leg
function createLeg(PosX, PosY, PosZ, 
                    scaleX, scaleY, scaleZ,
                    rotX, rotY, rotZ , 
                    material)
{ 
    var resultLeg = {};  
    var Leg = new THREE.Object3D(); 
    var Hip = {} ;
    var UpperLeg = {} ; 
    var Knee = {} ; 
    var LowerLeg = {} ; 
    var Angle = {} ; 
    var Foot = {} ; 
    /*Hip */
    Hip = createJoint(0, 0,  0, 
                     1,1 ,1,  
                     0, 0 , 0,
                      "Hip"); 
    /*Upper Leg*/
    UpperLeg = createOctahedron(0, 0 , 0.5 , 
                                1,1, 1, 
                                0, 0,0, 
                            material) ; 
    /*Knee*/
    Knee = createJoint( 0.0 , 0.0 , 1.0 , 
                        1, 1, 1 , 
                        0, 0, 0,
                        "Knee"); 
    /*Lower Leg*/
    LowerLeg = createOctahedron(0.0 , 0.0 , 0.5 , 
                                1,1,1, 
                                0 , 0, 0 ,
                                material);
    /*Angle*/
    Angle = createJoint(0.0 , 0.0 ,1.0 ,
                        1,1,1,
                        0, 0 , 0,
                        "Angle");
    /*Foot*/
    Foot = createRectangle(0.0 , 0.0 , 0.5 , 
                            1, 1, -1, 
                            0, 0, 0 , 
                            material);
    /*Add it to the sub child */
    Leg.add(Hip);
    Hip.add(UpperLeg); 
    Hip.add(Knee); 
    Knee.add(LowerLeg);
    Knee.add(Angle);
    Angle.add(Foot);

    Leg.position.x = PosX; 
    Leg.position.y = PosY; 
    Leg.position.z = PosZ;  

    Leg.scale.x = scaleX;  
    Leg.scale.y = scaleY;  
    Leg.scale.z = scaleZ;  

    Leg.rotation.x = rotX;  
    Leg.rotation.y = rotY; 
    Leg.rotation.z = rotZ;    

    resultLeg = new CHip(Leg, Hip , UpperLeg , Knee, LowerLeg ,Angle , Foot); 
    return resultLeg  ; //TODO : delete it 
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

function createRectangle(
        PosX, PosY , PosZ,
        ScaleX,ScaleY, ScaleZ, 
        RotX , RotY , RotZ, 
        material
)
{
    var geometry = new THREE.Geometry(); 
    geometry.vertices = [
        new THREE.Vector3( -0.3, 0.0 , 0 ),
        new THREE.Vector3( 0.3, 0.0 , 0 ),
        new THREE.Vector3( 0.0 , 0.3 , 0 ),
        new THREE.Vector3( 0.0 , -0.3, 0 ),
        new THREE.Vector3( 0.0, 0.0, 0.5 )
    ]; 
    geometry.faces = [
        new THREE.Face3( 2, 0,4  ),
        new THREE.Face3( 1, 2, 4 ),
        new THREE.Face3( 3 ,1 , 4  ),
        new THREE.Face3( 0, 3, 4 ),
        new THREE.Face3( 2, 1, 3 ),
        new THREE.Face3( 2, 3, 0 )
    ];    
    geometry.computeFaceNormals();     
    var object = new THREE.Mesh(geometry, material);

    object.position.x = PosX; 
    object.position.y = PosY; 
    object.position.z = PosZ; 

    object.rotation.x = RotX;  
    object.rotation.y = RotY; 
    object.rotation.z = RotZ; 

    object.scale.x = ScaleX;  
    object.scale.y = ScaleY; 
    object.scale.z = ScaleZ;  

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