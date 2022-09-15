import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Demo.css";


function Demo() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/Build/Mayer.loader.js",
    dataUrl: "/Build/Mayer.data",
    frameworkUrl: "/Build/Mayer.framework.js",
    codeUrl: "/Build/Mayer.wasm",
  });
  return (
    <React.Fragment>
      {!isLoaded && (
        <p className="loader">Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity className="unity-app" unityProvider={unityProvider} style={{ 
        width: "100vw", 
        height: "100vh",
        visibility: isLoaded ? "visible" : "hidden" }} />
    </React.Fragment>
  );
}

export default Demo;