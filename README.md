dot-require
===========

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Node.js extension installer for doT templates

##Usage

`require('dot-require').install();`

Or with options:

```javascript
require('dot-require').install({
    extension: '.dot',
    defines: {
        some_dot_compile_define: true
    },
    additionalTransform: function(src) {
        //do some transform
        return src;
    },
    templateSettings: {
        strip: false
    }
});
```

`templateSettings` defaults to `doT.templateSettings`, with partial defaults supported. For more information on `templateSettings` refere to the [doT documentation](http://olado.github.io/doT/).

`extension` defaults to `.dot`

And to uninstall:

`require('dot-require').uninstall();`

##Changelog

#####1.0.0
* Initial release

[npm-image]: https://img.shields.io/npm/v/dot-require.svg?style=flat
[npm-url]: https://npmjs.org/package/dot-require
[downloads-image]: https://img.shields.io/npm/dm/dot-require.svg?style=flat
[downloads-url]: https://npmjs.org/package/dot-require
