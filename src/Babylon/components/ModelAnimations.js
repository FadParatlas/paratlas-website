import * as BABYLON from "@babylonjs/core";
import { get } from "animejs";

var lampstat = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function behaviourManager(scene, model, camera) {

    scene.onPointerDown = function castRay() {
        var ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
            BABYLON.Matrix.Identity(), camera);
        var lamp = scene.getMaterialByName("LIGHT");
        var paint = scene.getMaterialByName("white paint");
        var light = scene.getLightByName("light1");

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh && lampstat === 0) {
            lamp.emissiveColor = new BABYLON.Color3(0, 0, 0);
            paint.emissiveColor = new BABYLON.Color3(0, 0, 0);
            light.diffuse =  new BABYLON.Color3(0, 0, 0);
            lampstat = getRandomInt(3);
        } else if (hit.pickedMesh && lampstat === 1) {
            lamp.emissiveColor = new BABYLON.Color3(1, 1, 1);
            paint.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            lampstat = getRandomInt(3);
        } else if (hit.pickedMesh && lampstat === 2) {
            lamp.emissiveColor = new BABYLON.Color3(getRandomInt(255)/255, getRandomInt(255)/255, getRandomInt(255)/255);
            paint.emissiveColor = lamp.emissiveColor;
            light.diffuse = lamp.emissiveColor;
            lampstat = getRandomInt(3);
        }
    }
}
