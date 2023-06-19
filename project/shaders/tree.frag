#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float randomRed;
uniform float randomGreen;


void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 rng = vec4(randomRed, randomGreen, 0, 1.0);

    if(color.a < 0.8) discard;
	
	gl_FragColor = color*0.8 + rng*0.2;
}