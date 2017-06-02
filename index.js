/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {

  name: 'ember-cli-summernote',

  options: {
    nodeAssets: {
      'summernote': {
        vendor: {
          srcDir: 'dist',
          include: ['summernote.css', 'summernote.min.js']
        },
        public: {
          srcDir: 'dist/font',
          include: ['summernote.eot', 'summernote.ttf', 'summernote.woff'],
          destDir: 'assets/font'
        }
      },
      bootstrap: {
        vendor: {
          srcDir: 'dist',
          include: ['css/bootstrap.min.css', 'js/bootstrap.min.js']
        }
      }
    }
  },

  included: function(app) {
    this._super.included(app);

    var bootstrapPath    = path.join(app.bowerDirectory,'/bootstrap/dist/');
    var fontawesomePath  = path.join(app.bowerDirectory,'/font-awesome/');
    var options          = app.options['ember-cli-summernote'] || {};


    // Import Bootstrap
    if (options.importBootstrapCSS) {
      // app.import(path.join(bootstrapPath, '/css/bootstrap.min.css'));
      app.import('vendor/bootstrap/bootstrap.min.css');

    }

    if (options.importBootstrapJS) {
      // app.import(path.join(bootstrapPath, '/js/bootstrap.min.js'));
      app.import('vendor/bootstrap/bootstrap.min.js');
    }

    // Import css and glyphicons from FontAwesome
    if (options.importFontawesomeCSS) {
      app.import(path.join(fontawesomePath, '/css/font-awesome.min.css'));
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.eot'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.svg'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.ttf'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.woff'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.woff2'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/FontAwesome.otf'), { destDir: 'fonts' });
    }

    // Include Summernote.

    app.import('vendor/summernote/summernote.css');
    app.import('vendor/summernote/summernote.min.js');

  },

};
