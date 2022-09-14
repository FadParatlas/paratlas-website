import * as BABYLON from "@babylonjs/core";

export function addCamera(canvas,scene) {

    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 1, 0, new BABYLON.Vector3(20,10,20), scene);

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 8, 0));
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI/2;

    camera.useAutoRotationBehavior = true;
    camera.inputs.remove(camera.inputs.attached.mousewheel);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    console.log("aaaa");

    return camera;
}