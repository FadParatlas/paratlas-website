import * as BABYLON from "@babylonjs/core";

export function addLight(scene) {
    var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 4, -3),
        scene
      );
      light.rotation = new BABYLON.Vector3(0.2,0,0);
      light.intensity = 1.5;
}