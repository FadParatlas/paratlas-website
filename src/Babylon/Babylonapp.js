import React, { Component } from "react";
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { SceneLoader } from '@babylonjs/core/Loading';

console.log(SceneLoader.IsPluginForExtensionAvailable('.obj'));

var scene;
var camera;
var boxMesh;
var startingPoint;
var currentMesh;
var ground;

class BabylonScene extends Component {

  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {

    this.engine = new BABYLON.Engine(this.canvas, true);

    scene = new BABYLON.Scene(this.engine);

    this.addLight();

    //--Camera---
    this.addCamera();

    this.addExternalModels();

    //--Ground---
    this.addGround();
    this.changeSkybox();
    this.addInteractivity();
    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });

  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = event => {
    this.engine.resize();
    console.log("Aaaaa");
  };

  addExternalModels = () => {
    BABYLON.SceneLoader.ImportMesh("",
      "https://dl.dropbox.com/s/z3u4yheu9fcdfd2/", "an_animated_cat.glb?", scene, function (meshes) {
        var cat = meshes[0];
        cat.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
      });

  }
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
  };

  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    camera.setPosition(new BABYLON.Vector3(5, 5, 5));
  };

  addInteractivity = () => {
    var getGroundPosition = function () {
      var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
      if (pickinfo.hit) {
          return pickinfo.pickedPoint;
      }

      return null;
  }
    var pointerDown = function (mesh) {
      currentMesh = mesh;
      console.log(mesh);
      startingPoint = getGroundPosition();
      if (startingPoint) { // we need to disconnect camera from canvas
        setTimeout(function () {
          console.log("aaaa");
          camera.detachControl(this.canvas);
        }, 0);
      }
    }

    var pointerUp = function () {
      if (startingPoint) {
        camera.attachControl(this.canvas, true);
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
          if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
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
  changeSkybox = () => {
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
  }
  addGround = () => {
    // Create a built-in "ground" shape.
    ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { height: 6, width: 6, subdivisions: 2 },
      scene
    );

    var groundMat = new BABYLON.StandardMaterial("ground", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    groundMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    groundMat.emissiveColor = BABYLON.Color3.Purple();
    ground.material = groundMat;
  };

  render() {
    return (
      <canvas
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={canvas => {
          this.canvas = canvas;
        }}
      ></canvas>
    );
  }
}
export default BabylonScene;