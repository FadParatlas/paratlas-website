import * as BABYLON from "@babylonjs/core";

export function airFryerAnimation(scene, model, camera) {

    const baseAnim = scene.getAnimationGroupByName(
        "Idle");

    baseAnim.start(true, 1.0, baseAnim.from, baseAnim.to, false);

    const modelAnim = scene.getAnimationGroupByName(
        "Open_Handle");
    const modelAnim2 = scene.getAnimationGroupByName(
        "Tumble");

    scene.onPointerDown = function castRay() {
        var ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
            BABYLON.Matrix.Identity(), camera);

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh) {
            var anim =
                modelAnim.start(false, 1.0, modelAnim.from, modelAnim.to, false);
            anim.onAnimationEndObservable.add(() => {
                modelAnim2.start(false, 1.0, modelAnim2.from, modelAnim2.to, false);
            });
        }
    }
}
