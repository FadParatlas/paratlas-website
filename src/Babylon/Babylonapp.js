import React, { Component } from "react";
import * as ReactDOM from 'react-dom';
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';

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
    this.engine.runRenderLoop(function () {
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
      "https://dl.dropbox.com/s/otf85vnoz8an32x/Expo%20%282%29.glb?", "an_animated_cat.glb?", scene, function (meshes) {
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
      value: new BABYLON.Vector3(-1.1, 1.5, 2.5),
    });

    keys.push({
      frame: 150,
      value: new BABYLON.Vector3(1, 1.5, 2.5),
    })

    animationcamera.setKeys(keys);

    //Handle Rotation
    var rotationcam = new BABYLON.Animation(
      "rotcamera",
      "rotation.y",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    var keyr = [];

    keyr.push({
      frame: 0,
      value: 0,
    });

    keyr.push({
      frame: 80,
      value: 0,
    })

    keyr.push({
      frame: 100,
      value: Math.PI / 2
    })

    rotationcam.setKeys(keyr);

    camera.animations = [];
    // camera.animations.push(rotationcam);

    // var animatable = scene.beginAnimation(camera, 0, 100, false);

    let j = 0;
    var pctScrolled;
    var winheight;

    var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight

    function getDocHeight() {
      var D = document;
      return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
      )
    }

    var docheight = getDocHeight()

    function amountscrolled() {
      winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
      var docheight = getDocHeight()
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
      var trackLength = docheight - winheight
      pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
      console.log(pctScrolled + '% scrolled')
    }

    function scrollDistance(callback, refresh = 66) {

      // Make sure a valid callback was provided
      if (!callback || typeof callback !== 'function') return;

      // Variables
      let isScrolling, start, end, distance;

      // Listen for scroll events
      window.addEventListener('scroll', function (event) {

        // Set starting position
        if (!start) {
          start = window.pageYOffset;
        }

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {

          amountscrolled()

          // Calculate distance
          end = window.pageYOffset;
          distance = end - start;

          // Run the callback
          callback(distance, start, end);

          // Reset calculations
          start = null;
          end = null;
          distance = null;

        }, refresh);

      }, false);

    }
    scrollDistance(function (distance) {
      console.log('You travelled ' + parseInt(Math.abs(distance), 10) + 'px ' + (distance < 0 ? 'up' : 'down'));
      var movementDelta = parseInt(Math.abs(distance), 10);
      var frameDelta = movementDelta / winheight * 150;

      if (distance < -10 && distance < 0) {
        console.log(frameDelta);
        var animatable = scene.beginDirectAnimation(camera, [rotationcam, animationcamera],
          j, j + (frameDelta), false)
        // animatable.goToFrame(j -= frameDelta);
        // animatable.pause();
        console.log(j);
        if (j > 0) {
          j -= frameDelta;
        }
        else {
          j = 150;
        }
      } else if (distance >= -10 && distance < 10) {

        var animatable = scene.beginDirectAnimation(camera, [rotationcam, animationcamera], j + 1, j, false);
        animatable.goToFrame(j);
        animatable.pause();
        if (j > 0) {
          j--;
        } else {
          j = 150;
        }


      } else if (distance > 10) {
        console.log(-movementDelta);
      }
      else {
        console.log("no distance");
      }
    });

    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        var animatable = scene.beginDirectAnimation(camera, [rotationcam, animationcamera], j + 1, j, false);
        animatable.goToFrame(j);
        animatable.pause();
        if (j > 0) {
          j--;
        } else {
          j = 150;
        }
      }

      else if (event.deltaY > 0) {
        var animatable = scene.beginDirectAnimation(camera, [rotationcam, animationcamera], j -
          1, j, false);
        animatable.goToFrame(j);
        animatable.pause();
        if (j < 150) {
          j++;
        } else {
          j = 0;
        }
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
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);
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