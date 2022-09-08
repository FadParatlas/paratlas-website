import React, { Component } from "react";
import * as BABYLON from "@babylonjs/core";
import { loadAllAssets } from "./components/LoaderManager";
import '@babylonjs/loaders';
import '@babylonjs/inspector';

var scene;
var canv;

class BabylonScene extends Component {

  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

    componentDidMount = () => {

    this.engine = new BABYLON.Engine(this.canvas, true);

    scene = new BABYLON.Scene(this.engine);

    // scene.debugLayer.show();

    canv = this.canvas;

    window.addEventListener("resize", this.onWindowResize, false);

    scene.onBeforeRenderObservable.runCoroutineAsync(
    loadAllAssets(canv, scene));

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