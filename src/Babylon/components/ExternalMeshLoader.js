import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { airFryerAnimation } from "./ModelAnimations";

export function addExternalModels(model, scene, camera) {
  BABYLON.SceneLoader.ImportMesh("",
    "https://dl.dropbox.com/s/jfxzc71kdm4n770/"
    , "Mayer_Airfryer_.glb?", scene,
    function (meshes) {
      model = meshes[0];
      model.position = new BABYLON.Vector3(10, 5, 5);

      airFryerAnimation(scene, model, camera);

      var mat = scene.getMaterialByName("Mayer");
      var probe = new BABYLON.ReflectionProbe("main", 512, scene);
      probe.renderList.push(model);

      mat.reflectionTexture = probe.cubeTexture;
    });
}