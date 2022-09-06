import * as BABYLON from "@babylonjs/core";

export function airFryerAnimation(scene, model,camera) {

    const modelAnim = scene.getAnimationGroupByName(
        "Open_Handle");

    scene.onPointerDown = function castRay() {
        var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh) {
            modelAnim.start(false, 1.0, modelAnim.from, modelAnim.to, false);
        }
    }
}
