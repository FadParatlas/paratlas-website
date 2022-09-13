import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { behaviourManager } from "./ModelAnimations";

export function addExternalModels(scene, model) {
  const importModels = BABYLON.SceneLoader.ImportMeshAsync(null,
    "https://dl.dropbox.com/s/6sqhj0m9u6yhuzo/"
    , "aaaaaa.glb?", scene, function (evt) {
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
    model.position = new BABYLON.Vector3(0, 0, 0);
    model.rotation = new BABYLON.Vector3(0,0, 0);
    model.scaling = new BABYLON.Vector3(20,20,20);

    // airFryerAnimation(scene, model, camera);

    var mat = scene.getMaterialByName("Metal");
    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList.push(model);

    mat.reflectionTexture = probe.cubeTexture;

    var paint = scene.getMaterialByName("white paint");
    paint.emissiveColor = new BABYLON.Color3(0.2,0.2,0.2);

    behaviourManager(scene, model);

    // const idleAnim = scene.getAnimationGroupByName(
    //   "Idle");
    // idleAnim.start(false, 1.0, idleAnim.from, idleAnim.to, false);

    var mirror = BABYLON.Mesh.CreateBox("Mirror", 1.0, scene);
    mirror.scaling = new BABYLON.Vector3(100.0, 0.01, 100.0);
    mirror.material = new BABYLON.PBRMaterial("mirror", scene);
    mirror.material.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    mirror.material.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -2.0);
    mirror.material.reflectionTexture.renderList = [model];
    mirror.material.reflectionTexture.level = 0.8;

    mirror.material.metallicTexture = new BABYLON.Texture("http://i.imgur.com/wGyk6os.png", scene);
    mirror.material.metallicTexture.uScale = 30;
    mirror.material.metallicTexture.vScale = 30;
    mirror.position = new BABYLON.Vector3(0, 0, 0);

    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = scene.clearColor;
    scene.fogStart = 30.0;
    scene.fogEnd = 50.0;

    return model;
  })
}