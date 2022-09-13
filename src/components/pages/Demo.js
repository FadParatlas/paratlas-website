import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";


function Demo() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Presentation.loader.js",
    dataUrl: "Build/Presentation.data",
    frameworkUrl: "Build/Presentation.framework.js",
    codeUrl: "Build/Presentation.wasm",
  });
  return (
    <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
  );
}

export default Demo;