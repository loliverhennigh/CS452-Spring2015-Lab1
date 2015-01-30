
var gl;
var points;

var three = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    var vertices = [
	    vec2(0, -1),
	    vec2(-1, 1),
	    vec2(1, 1),
	    vec2(0, -1),
	    vec2(-1, 0),
	    vec2(0, 1),
	    vec2( 1, 0),
		vec2( 1, 0),
	    vec2(0, -1),
	    vec2(-1, 0),
		vec2(-.7, .7),
	    vec2(0, 1),
	    vec2( .7, .7),
		vec2( 1,0)
    ];
	

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
//	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices_b), gl.STATIC_DRAW);
//    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices_c), gl.STATIC_DRAW);


    // Associate our shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	canvas.onclick = function () {
		three = three + 1;
		three = three % 3;
		render();
	}

	

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	if(three == 0)
	{
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 3);
	}
	if(three == 1)
	{
		gl.drawArrays( gl.TRIANGLE_FAN, 3, 4);
	}
	if(three == 2)
	{
		gl.drawArrays( gl.TRIANGLE_FAN, 7, 6);
	}
}
