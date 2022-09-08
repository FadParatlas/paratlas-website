import * as BABYLON from "@babylonjs/core";

export function addLight(scene,camera) {
    var light = new BABYLON.PointLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      // light.rotation = new BABYLON.Vector3(5,-1,0);
      light.intensity = 1;
      light.position = camera.position;

      return light;
}