import React from "react";
import { loadAllAssets } from "./components/LoaderManager";
import SceneComponent from 'babylonjs-hook';
import '@babylonjs/loaders';
import '@babylonjs/inspector';

const mystyle = {
  width: "100vw",
  height: "100vh"
};

const onSceneReady = (scene) => {

  const canvas = scene.getEngine().getRenderingCanvas();

  loadAllAssets(canvas, scene);
  
};


const onRender = (scene) => {

};

export default () => (
  <div>
    <SceneComponent
      style={mystyle}
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas" />
  </div>
);
