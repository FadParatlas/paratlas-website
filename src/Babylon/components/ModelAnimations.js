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
            /* run animations after end of animation
            * @TODO: create a idle animation of the object in an open position
            * @TODO: add states of the object, idle(0) > open(1) > idle_open(2) > close(3)
            * idle_2(4) > tumble(5) > _untumble(6) > idle(7)  
            */
            anim.onAnimationEndObservable.add(() => {
                modelAnim2.start(false, 1.0, modelAnim2.from, modelAnim2.to, false);
            });
        }
    }
}
