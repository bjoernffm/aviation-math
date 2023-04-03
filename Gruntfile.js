module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gitclone: {
            pages: {
                options: {
                    repository: 'https://github.com/bjoernffm/bjoernffm.github.io',
                    branch: 'master',
                    directory: 'tmp_pages'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    // Default task(s).
    grunt.registerTask('default', ['gitclone:pages']);
    grunt.registerTask('upload-docs', ['gitclone:pages']);
  
  };