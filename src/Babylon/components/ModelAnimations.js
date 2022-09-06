import * as BABYLON from "@babylonjs/core";

export function airFryerAnimation(scene) {
    const modelAnim = scene.getAnimationGroupByName(
        "Open_Handle");

    modelAnim.start(true, 1.0, modelAnim.from, modelAnim.to, false);
}