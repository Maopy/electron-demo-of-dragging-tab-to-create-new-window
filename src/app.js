import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import "xel/xel.min.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { app } from "@electron/remote";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";

import { ipcRenderer } from 'electron';

const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

document.querySelector("#app").style.display = "block";
document.querySelector("#greet").innerHTML = greet();
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML =
  process.versions.electron;

const drs = document.querySelectorAll('[draggable]')

function handleDragEnd(e) {
  this.style.opacity = '0.4'
  ipcRenderer.send('create-new-window', {
    x: e.screenX,
    y: e.screenY - e.toElement.offsetHeight
  })
}

[].forEach.call(drs, col => {
  col.addEventListener('dragend', handleDragEnd, false)
})

const s = location.hash
document.querySelector('#pageTitle').innerHTML = s



const madBtn = document.querySelector('#madBtn')

madBtn.addEventListener('click', handleMadMode)

function handleMadMode () {
  const COUNT = 9
  const { availWidth, availHeight } = window.screen
  const width = Math.floor(availWidth / 3)
  const height = Math.floor(availHeight / 3)

  let t = 0
  while (t < COUNT) {
    const x = width * Math.floor(t % 3)
    const y = height * Math.floor(t / 3)
    ipcRenderer.send('create-new-window', {
      x, y, width, height
    })
    t++
  }
}
