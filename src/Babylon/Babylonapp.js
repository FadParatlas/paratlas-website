import React, { Component } from "react";
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { addExternalModels } from "./components/ExternalMeshLoader";
import { addLight } from "./components/LightManager";
import { addCamera } from "./components/CameraManager";
import { addSkybox } from "./components/SkyboxManager";

var scene;
var camera;
var canv;
var model;

class BabylonScene extends Component {

  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {

    this.engine = new BABYLON.Engine(this.canvas, true);

    scene = new BABYLON.Scene(this.engine);

    canv = this.canvas;

    addCamera();
    addExternalModels(model,scene);
    addLight(camera,canv,scene);
    addSkybox(scene);

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


  detectInteraction = () => {
    window.addEventListener("click", (e) => {

    })
  }

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