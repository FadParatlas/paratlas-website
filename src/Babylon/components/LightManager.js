import * as BABYLON from "@babylonjs/core";

export function addLight(scene) {
    var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      // light.rotation = new BABYLON.Vector3(5,-1,0);
      light.intensity = 0.3;
}