import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { airFryerAnimation } from "./ModelAnimations";

export function addExternalModels(model,scene) {
    BABYLON.SceneLoader.ImportMesh("",
    "https://dl.dropbox.com/s/jfxzc71kdm4n770/"
    , "Mayer_Airfryer_.glb?", scene,
    function (meshes, animationGroups) {
      model = meshes[0];
      model.position = new BABYLON.Vector3(10, 5, 5);

      airFryerAnimation(scene);
    });
}