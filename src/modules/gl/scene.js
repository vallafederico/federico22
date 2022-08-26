// import Quad from "./mod/_quad";

import Slider from "./slider";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    this.slider = new Slider(this.gl);

    // console.log(this.quad);
  }

  render(t, y = 0) {
    // console.log(t);

    if (this.slider) this.slider.render(t);
    // if (this.quads) this.quads.forEach((quad) => quad.render(t));
  }

  resize(gl) {
    this.gl = gl;
    if (this.slider) this.slider.resize(gl);
    // if (this.quads) this.quads.forEach((quad) => quad.resize(this.gl));
  }
}
