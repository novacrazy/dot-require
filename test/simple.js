/**
 * Created by novacrazy on 1/1/2015.
 */

var assert = require( 'assert' );
var doT = require( 'dot' );
var dot_require = './../index.js';

describe( 'requiring dot-require', function() {
    it( 'should not do anything by itself', function() {
        require( dot_require );

        var extension = require.extensions['.dot'];

        assert.equal( extension, void 0 );
    } );

    it( 'should install with default settings when install is called', function() {
        require( dot_require ).install();

        var extension = require.extensions['.dot'];

        assert.notEqual( extension, void 0 );
        assert.strictEqual( extension.templateSettings, doT.templateSettings );
        assert.equal( extension.defines, void 0 );
        assert.equal( extension.additionalTransform, void 0 );
    } );

    it( 'should install and return the compiler for the extension', function() {
        var extension = require( dot_require ).install();

        assert.strictEqual( extension, require.extensions['.dot'] );
    } );
} );

describe( 'uninstalling dot-require', function() {
    it( 'should remove the extension', function() {
        require( dot_require ).uninstall();

        assert.equal( require.extensions['.dot'], void 0 );
    } );
} );

describe( 'installing dot-require with options', function() {
    var defines = {
        test: 1234
    };

    it( 'should use the options', function() {
        var extension = require( dot_require ).install( {
            extension:           '.dot',
            defines:             defines,
            additionalTransform: function(src) {
                return "<!DOCTYPE HTML>" + src;
            },
            templateSettings:    {
                strip: true
            }
        } );

        assert.notEqual( extension, void 0 );
        assert.notEqual( extension.templateSettings, doT.templateSettings );
        assert.strictEqual( extension.defines, defines );
        assert.notEqual( extension.additionalTransform, void 0 );
    } );
} );

describe( 'using the new extension', function() {
    it( 'should compile required dot files', function() {

        var simple = require( './dots/simple.dot' );

        assert.strictEqual( typeof simple, 'function' );

        var res = simple( {
            hello: "Hello, World"
        } );

        //Note the additionalTransform option above
        assert.equal( res, '<!DOCTYPE HTML>Hello, World!' );
    } );
} );
