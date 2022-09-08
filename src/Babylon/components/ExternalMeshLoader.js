import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { airFryerAnimation } from "./ModelAnimations";

export function addExternalModels(model, scene, camera) {
  const importModels = BABYLON.SceneLoader.ImportMeshAsync("",
    "https://dl.dropbox.com/s/jfxzc71kdm4n770/"
    , "Mayer_Airfryer_.glb?", scene, function (evt) {
      var loadedPercent = 0;
      if (evt.lengthComputable) {
          loadedPercent = (evt.loaded * 100 / evt.total).toFixed();
      } else {
          var dlCount = evt.loaded / (1024 * 1024);
          loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
      }
      console.log(loadedPercent);
    })

  importModels.then((result) => {

    model = result.meshes[0];
    model.position = new BABYLON.Vector3(10, 11, 5);
    model.rotation = new BABYLON.Vector3(0, 0, 0);
    model.scaling = new BABYLON.Vector3(2,2,2);

    airFryerAnimation(scene, model, camera);

    var mat = scene.getMaterialByName("Mayer");
    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList.push(model);

    mat.reflectionTexture = probe.cubeTexture;

    const idleAnim = scene.getAnimationGroupByName(
      "Idle");
    idleAnim.start(false, 1.0, idleAnim.from, idleAnim.to, false);

    return model;

  })
}