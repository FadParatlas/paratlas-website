import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Demo.css";


function Demo() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/Build/Presentation.loader.js",
    dataUrl: "/Build/Presentation.data",
    frameworkUrl: "/Build/Presentation.framework.js",
    codeUrl: "/Build/Presentation.wasm",
  });
  return (
    <React.Fragment>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity className="unity-app" unityProvider={unityProvider} style={{ 
        width: "100vw", 
        height: "100vh",
        visibility: isLoaded ? "visible" : "hidden" }} />
    </React.Fragment>
  );
}

export default Demo;