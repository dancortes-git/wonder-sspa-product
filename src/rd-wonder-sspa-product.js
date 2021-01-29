/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

function beforeBootstrap() {
  //console.log("before bootstrap");
  return Promise.resolve();
}

function beforeMount() {
  //console.log("before mount");
  return Promise.resolve();
}

function beforeUnmount() {
  //console.log("before unmount");
  return Promise.resolve();
}

export const bootstrap = [beforeBootstrap, lifecycles.bootstrap];
export const mount = [beforeMount, lifecycles.mount];
export const unmount = [beforeUnmount, lifecycles.unmount];

//export const { bootstrap, mount, unmount } = lifecycles;
