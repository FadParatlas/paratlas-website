import React, { Component } from "react";
import * as ReactDOM from 'react-dom';
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { SceneLoader } from '@babylonjs/core/Loading';

console.log(SceneLoader.IsPluginForExtensionAvailable('.obj'));

var scene;
var camera;
var startingPoint;
var currentMesh;
var ground;
var canv;

class BabylonScene extends Component {

  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {

    this.engine = new BABYLON.Engine(this.canvas, true);

    scene = new BABYLON.Scene(this.engine);

    canv = this.canvas;

    this.addLight();

    //--Camera---
    this.addCamera();
    this.handleCameraAnimations();

    // this.addMesh();
    this.addExternalModels();

    //--Ground---
    // this.addGround();
    this.changeSkybox();
    this.addInteractivity();
    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(function() {
      scene.render();
    });

  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }
  windowResizeListener = () => {
    let windowW, windowH;
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    console.log("listener : " + windowW + " , " + windowH);
  }

  onWindowResize = event => {
    this.engine.resize();
    console.log(canv.size);
    this.windowResizeListener();
  };

  addExternalModels = () => {
    BABYLON.SceneLoader.ImportMesh("",
      "https://dl.dropbox.com/s/dlo7ymmaz93t8l3/The_Atelier.glb?", "an_animated_cat.glb?", scene, function (meshes) {
        var cat = meshes[0];
        cat.scaling = new BABYLON.Vector3(1, 1, 1);
      });

  }
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 100, 0),
      scene
    );
  };

  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    camera = new BABYLON.FlyCamera("UniversalCamera", new BABYLON.Vector3(-1, 1.5, -10), scene);
    camera.inertia = 0;
  };

  handleCameraAnimations = () => {
    const frameRate = 10;
    const frameRateMax = 600;
    //handle position
    var animationcamera = new BABYLON.Animation(
      "myAnimationcamera",
      "position",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    var keys = [];


    keys.push({
      frame: 0,
      value: camera.position.clone(),
    });

    keys.push({
      frame: 100,
      value: new BABYLON.Vector3(-1,1.5,10),
    });

    animationcamera.setKeys(keys);

    // camera.animations = [];
    // camera.animations.push(animationcamera);

    //Handle Rotation
    var rotationcam = new BABYLON.Animation(
      "rotcamera",
      "rotation",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    var keyr = [];

    keyr.push({
      frame: 0,
      value: camera.rotation.clone(),
    });

    keyr.push({
      frame: 100,
      value: new BABYLON.Vector3(0,20,0),
    })

    rotationcam.setKeys(keyr);

    camera.animations = [];
    // camera.animations.push(rotationcam);

    // var animatable = scene.beginAnimation(camera, 0, 100, false);

    let j = 0;

    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        var animatable = scene.beginDirectAnimation(camera,[rotationcam,animationcamera],j + 1, j, false);
        animatable.goToFrame(j);
        animatable.pause();
        console.log(camera.rotation);
        if (j > 0) {
          j--;
        } else {
          j = 100;
        }
        console.log(j);
      }
      else if (event.deltaY > 0) {
        var animatable = scene.beginAnimation(camera, j - 1, j, false);
        animatable.goToFrame(j);
        animatable.pause();
        console.log(camera.rotation);
        if (j < 60) {
          j++;
        } else {
          j = 0;
        }
        console.log(j);
      }
    });

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
      startingPoint = getGroundPosition();
      if (startingPoint) { // we need to disconnect camera from canvas
        setTimeout(function () {
          // camera.detachControl(canv);
        }, 0);
      }
    }

    var pointerUp = function () {
      if (startingPoint) {
        // camera.attachControl(canv, true);
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
  changeSkybox = () => {
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
  }

  addMesh = () => {
    var box = BABYLON.MeshBuilder.CreateBox("testBox", { size: 1 }, scene)

    // const frameRate = 10;

    // const xSlide = new BABYLON.Animation("Slide", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // const keyFrames = [];

    // keyFrames.push({
    //   frame: 0,
    //   value: box.position.clone(),
    // });

    // keyFrames.push({
    //   frame: frameRate,
    //   value: new BABYLON.Vector3(0,0,5),
    // });

    // keyFrames.push({
    //   frame: 2 * frameRate,
    //   value: new BABYLON.Vector3(0,0,-5),
    // });

    // keyFrames.push({
    //   frame: 4 * frameRate,
    //   value: new BABYLON.Vector3(-5,0,-10),
    // });
    // keyFrames.push({
    //   frame: 6 * frameRate,
    //   value: box.position.clone(),
    // });

    // xSlide.setKeys(keyFrames);

    // box.animations.push(xSlide);
    // scene.beginAnimation(box, 0, 6 * frameRate, true);
  };

  // addGround = () => {
  //   // Create a built-in "ground" shape.
  //   ground = BABYLON.MeshBuilder.CreateGround(
  //     "ground1",
  //     { height: 100, width: 100, subdivisions: 2 },
  //     scene
  //   );

  //   var groundMat = new BABYLON.StandardMaterial("ground", scene);
  //   groundMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  //   groundMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  //   groundMat.emissiveColor = BABYLON.Color3.Black();
  //   ground.material = groundMat;
  // };

  render() {
    return (
      <canvas
        style={{ width: "100%", height: "100%" }}
        ref={canvas => {
          this.canvas = canvas;
        }}
      ></canvas>
    );
  }
}
export default BabylonScene;