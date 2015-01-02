/**
 * Created by novacrazy on 1/1/2015.
 */

"use strict";

var fs = require( 'fs' );
var doT = require( 'dot' );

//Taken from module.js
function stripBOM(content) {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if( content.charCodeAt( 0 ) === 0xFEFF ) {
        content = content.slice( 1 );
    }
    return content;
}

var installed = false;

function compile(module, filename) {
    var src = fs.readFileSync( filename, 'utf-8' );

    src = stripBOM( src );

    if( typeof compile.additionalTransform === 'function' ) {
        src = compile.additionalTransform( src );
    }

    try {
        module.exports = doT.template( src, compile.templateSettings, compile.defines );

    } catch( err ) {
        err.message = filename + ': ' + err.message;
        throw err;
    }
}

exports.install = function install(options) {
    if( !installed ) {
        options = options || {};

        var defaultTemplateSettings = doT.templateSettings;

        if( options.templateSettings != null ) {

            for( var it in defaultTemplateSettings ) {
                if( defaultTemplateSettings.hasOwnProperty( it ) && !options.templateSettings.hasOwnProperty( it ) ) {
                    options.templateSettings[it] = defaultTemplateSettings[it];
                }
            }

        } else {
            options.templateSettings = defaultTemplateSettings;
        }

        compile.templateSettings = options.templateSettings;
        compile.defines = options.defines;
        compile.additionalTransform = options.additionalTransform;

        if( typeof options.extension === 'string' ) {
            compile.extension = options.extension;

        } else {
            compile.extension = '.dot';
        }

        require.extensions[compile.extension] = compile;

        if( !options.dontInstall ) {
            installed = true;
        }
    }

    return compile;
};

exports.uninstall = function uninstall() {
    if( installed ) {
        require.extensions[compile.extension] = void 0;
        installed = false;
    }
};
