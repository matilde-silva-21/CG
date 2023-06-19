#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;


void main() {
	vec4 color =vec4(0.6471, 0.5059, 0.8745, 1.0);

	if (coords.x > 0.5)
		color=vec4(0.9216, 0.9059, 0.1882, 1.0);

	color.r = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	color.g = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	color.b = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	
	gl_FragColor = color; 
}
