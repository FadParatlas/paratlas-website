import { addExternalModels } from "../components/ExternalMeshLoader";
import { addLight } from "../components/LightManager";
import { addCamera } from "../components/CameraManager";
import { addSkybox } from "../components/SkyboxManager";
import '@babylonjs/loaders';

var camera;
let loader = false;

export async function loadAllAssets(canvas, scene) {

    camera = addCamera(canvas, scene);
    addLight(scene, camera);
    addSkybox(scene);
    addExternalModels(scene);
}