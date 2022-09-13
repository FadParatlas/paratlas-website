import { addExternalModels} from "../components/ExternalMeshLoader";
import { addLight } from "../components/LightManager";
import { addCamera } from "../components/CameraManager";
import { addSkybox } from "../components/SkyboxManager";
import '@babylonjs/loaders';

var camera;
var model;

export function* loadAllAssets(canv, scene) {

    camera = addCamera(canv,scene);
    yield;
    model = addExternalModels(scene);
    yield;
    addLight(scene,camera,model);
    yield;
    addSkybox(scene);
    yield;
}