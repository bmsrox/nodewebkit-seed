module.exports = function( grunt ) {

  grunt.initConfig({

    uglify : {
      options : {
        mangle : false
      },

      scripts : {
        files : {
          'app/js/main.js' : 'build/js/scripts.js'
        }
      }
    }, // uglify



    sass : {
      dist : {
        options : { style : 'compressed' },
        files : {
          'app/css/style.css' : 'build/sass/style.sass',
          'app/css/reset.css' : 'build/sass/reset.sass'
        }
      }
    }, // sass



    watch : {
      dist : {
        files : [
          'build/js/**/*',
          'build/sass/**/*',
          'build/app/**/*'
        ],

        tasks : [ 'uglify', 'sass', 'jade' ]
      }
    }, // watch

    nwjs: {
      options: {
          files: ['!build', '!.sass-cache', '!node_modules', '!Gruntfile.js'],
          platforms: ['linux64'],
          buildDir: '../webkitbuilds', // Where the build version of my node-webkit app is saved
      },
      src: ['../neonext/**/*'] // Your node-webkit app
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
                'app/index.html':'build/app/index.jade'
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