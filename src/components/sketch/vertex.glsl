varying vec2 vUv;
void main() {
    vUv = uv;
    //gl_position = projectionMatrix * modelViewMatrix * //

    vec4 mvPosition = modelViewMatrix vec4(position, 1.);
    gl_PointSize = 5000. * ( 1. / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}