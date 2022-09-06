import * as BABYLON from "@babylonjs/core";

export function addSandInteractivity(canv,camera,scene) {
    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
          return pickinfo.pickedPoint;
        }
  
        return null;
      }
      var pointerDown = function (mesh) {
        currentMesh = mesh;
        startingPoint = getGroundPosition();
        console.log(mesh);
        if (startingPoint) { // we need to disconnect camera from canvas
          setTimeout(function () {
            camera.detachControl(canv);
          }, 0);
        }
      }
  
      var pointerUp = function () {
        if (startingPoint) {
          camera.attachControl(canv, true);
          startingPoint = null;
          return;
        }
      }
  
      var pointerMove = function () {
        if (!startingPoint) {
          return;
        }
        var current = getGroundPosition();
        if (!current) {
          return;
        }
  
        var diff = current.subtract(startingPoint);
        currentMesh.position.addInPlace(diff);
  
        startingPoint = current;
  
      }
  
      scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh !== ground) {
              pointerDown(pointerInfo.pickInfo.pickedMesh)
            }
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            pointerUp();
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            pointerMove();
            break;
        }
      });
}