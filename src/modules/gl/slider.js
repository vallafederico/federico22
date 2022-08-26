import SliderQuad from "./mod/slider_quad";
import { lerp, clamp } from "../utils/math";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.wrap = document.querySelector('[data-slider="wrap"]');

    this.create();
  }

  create() {
    this.sliderEvents();

    const sliderEl = [...this.wrap.querySelectorAll('[data-gl="simg"]')];
    this.quads = sliderEl.map((item) => new SliderQuad(this.gl, item));
  }

  /* --- Lifecycle */

  render(t) {
    this.renderSlider();

    if (this.quads)
      this.quads.forEach((quad) =>
        quad.render(t, -this.sliding.x * this.gl.vp.px)
      );
  }

  renderSlider() {
    this.sliding.tx = clamp(0, this.sliding.params.max, this.sliding.tx);
    this.sliding.x = lerp(this.sliding.tx, this.sliding.x, 0.9);

    this.wrap.style.transform = `translateX(${-this.sliding.x}px)`;
  }

  resize(gl) {
    this.wrap.style.transform = `translateX(0px)`;
    this.sliding = {
      x: 0,
      tx: 0,
      params: calcSliderParams(this.wrap),
    };

    this.gl = gl;
    if (this.quads) this.quads.forEach((quad) => quad.resize(this.gl));
  }

  /* --- Slider Behaviour */
  sliderEvents() {
    this.mouse = {
      x: 0,
      tx: 0,
    };

    this.sliding = {
      x: 0,
      tx: 0,
      params: calcSliderParams(this.wrap),
    };

    document.onwheel = (e) => this.onScroll(e);
    document.onmousedown = (e) => (this.mouse.down = true);
    document.onmouseup = (e) => (this.mouse.down = false);
    document.onmousemove = (e) => this.onMouseMove(e);
  }

  onScroll(e) {
    this.sliding.tx += e.deltaY * 0.3;
  }

  onMouseMove(e) {
    if (!this.mouse.down) return;
    // console.log("move");
    this.sliding.tx -= e.movementX;
  }
}

// utils
function calcSliderParams(item) {
  const wrap = item.parentElement;
  const ww = window.innerWidth;

  const positions = [...item.children].map((item) => {
    const { x } = item.getBoundingClientRect();
    return x - ww / 2;
  });

  return {
    min: 0,
    max: item.scrollWidth,
    positions,
  };
}
