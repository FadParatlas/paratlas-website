import React, { Component } from "react";
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders';
import { SceneLoader } from '@babylonjs/core/Loading';

console.log(SceneLoader.IsPluginForExtensionAvailable('.obj'));

var scene;
var boxMesh;
/**
 * Example temnplate of using Babylon JS with React
 */
class BabylonScene extends Component {

  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {
    // start ENGINE
    this.engine = new BABYLON.Engine(this.canvas, true);
    

    //Create Scene
    scene = new BABYLON.Scene(this.engine);

    //--Light---
    this.addLight();

    //--Camera---
    this.addCamera();

    //--Meshes---
    this.addModels();

    this.addExternalModels();

    //--Ground---
    this.addGround();

    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    //Animation
    scene.registerBeforeRender(() => {
      boxMesh.rotation.y += 0.01;
      boxMesh.rotation.x += 0.01;
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
    let assetManager = new BABYLON.AssetsManager(scene);
    let model = assetManager.addMeshTask("model", "", "https://raw.githubusercontent.com/FadParatlas/paratlas-website/master/public/assets/", "test.obj");
 
    model.onSuccess = function(t){
        t.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    }

    model.onError = function(t, message, exception){
      console.error(message, exception);
  }

  assetManager.load();

  }

  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
  };

  /**
   * Add Camera
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    var camera = new BABYLON.ArcRotateCamera(
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

  /**
   * Create Stage and Skybox
   */
  addGround = () => {
    // Create a built-in "ground" shape.
    var ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { height: 6, width: 6, subdivisions: 2 },
      scene
    );

    //Add SkyBox
  };

  /**
   * Add Models
   */
  addModels = () => {
    // Add BOX
    boxMesh = BABYLON.MeshBuilder.CreateBox(
      "box",
      { height: 1, width: 1, depth: 1 },
      scene
    );
    boxMesh.position.y = 1;

    var woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    woodMaterial.diffuseTexture = new BABYLON.Texture(
      "./assets/portal_cube.png",
      scene
    );
    boxMesh.material = woodMaterial;
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