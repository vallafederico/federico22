import Dom from "./modules/dom";
import Gl from "./modules/gl/gl";
import { Router } from "./modules/router";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.init();
  }

  load() {}

  init() {
    // router
    this.router = new Router();
    this.router.on("T_START", ({ next }) => {
      // PAGE TRANSITION - handling
      this.router.swap();
      if (this.gl) this.gl.handlePageChange(next);
    });

    this.gl = new Gl();
  }

  /*
   ** Loop
   */

  update() {
    window.requestAnimationFrame(this.update.bind(this));
  }

  /*
   ** Events
   */

  addEventsListeners() {
    new ResizeObserver((entry) => this.onResize(entry[0].contentRect)).observe(
      this.body
    );

    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.handleMouseDown.bind(this));
      window.addEventListener("touchmove", this.handleMouseMove.bind(this));
      window.addEventListener("touchend", this.handleMouseUp.bind(this));
    } else {
      window.addEventListener("mousedown", this.handleMouseDown.bind(this));
      window.addEventListener("mousemove", this.handleMouseMove.bind(this));
      window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
  }

  onResize() {
    // console.log('resizing');
  }

  handleMouseDown() {}
  handleMouseMove() {}
  handleMouseUp() {}
}

new App();
