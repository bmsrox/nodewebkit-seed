module.exports = function( grunt ) {

  grunt.initConfig({

    uglify : {
      options : {
        mangle : false
      },

      scripts : {
        files : {
          'dist/js/main.js' : 'src/js/scripts.js'
        }
      }
    }, // uglify

    sass : {
      dist : {
        options : { style : 'compressed' },
        files : {
          'dist/css/style.css' : 'src/sass/style.sass',
          'dist/css/reset.css' : 'src/sass/reset.sass'
        }
      }
    }, // sass

    watch : {
      dist : {
        files : [
          'src/js/**/*',
          'src/sass/**/*',
          'src/app/**/*',
          'package.json'
        ],

        tasks : [ 'uglify', 'sass', 'jade', 'nwjs' ]
      }
    }, // watch

    nwjs: {
      options: {
          platforms: ['linux64'],
          buildDir: './build', // Where the build version of my node-webkit app is saved
          version: 'v0.12.3',
      },
      src: ['**/**', '!**/node_modules/**', '!**/.sass-*/**', '!**/cache/**', '!**/build/**', '!**/src/**', '!**/Gruntfile.js'],
    },

    jade: {
        compile: {
            options: {
                data: {
                    debug: false
                },
                pretty: true
            },
            files: {
                'dist/index.html':'src/app/index.jade'
            }
        }
    },

  });

  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-nw-builder' );
  grunt.loadNpmTasks( 'grunt-contrib-jade' );

  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'uglify', 'sass', 'jade', 'nwjs' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};