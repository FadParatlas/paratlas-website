import * as BABYLON from "@babylonjs/core";

export function addCamera(camera,canv,scene) {
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 20, -20), scene);

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 10, 5));

    // This attaches the camera to the canvas
    camera.attachControl(canv, false);

    camera.inertia = 0;

    return camera;
}