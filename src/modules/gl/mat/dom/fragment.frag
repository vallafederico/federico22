precision mediump float;

uniform sampler2D u_diff;  // vec4 img = texture2D(u_diff, v_uv);

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
 

void main() {

    vec4 img = texture2D(u_diff, v_uv);



    gl_FragColor.rgb = img.rgb;
    // gl_FragColor.rgb = vec3(v_uv, 1.);
    gl_FragColor.a = 1.;
}

