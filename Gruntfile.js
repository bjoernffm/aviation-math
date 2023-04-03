module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gitclone: {
            github_pages: {
                options: {
                    repository: 'https://github.com/bjoernffm/bjoernffm.github.io',
                    branch: 'master',
                    directory: 'tmp_pages'
                }
            }
        },
        gitadd: {
            github_pages: {
                options: {
                    cwd: "tmp_pages"
                },
                files: {
                    src: '.'
                }
            }
        },
        gitcommit: {
            github_pages: {
                options: {
                    cwd: "tmp_pages",
                    message: 'Automated commit for publishing aviation-math docs'
                },
                files: {
                    // Specify the files you want to commit
                }
            }
        },
        gitpush: {
            github_pages: {
                options: {
                    cwd: "tmp_pages",
                    // Target-specific options go here.
                }
            }
        },
        clean: {
            github_pages: ['tmp_pages'],
            docs: ['tmp_pages/aviation-math']
        },
        copy: {
            docs: {
                expand: true,
                src: 'docs/**',
                dest: 'tmp_pages/aviation-math/',
            },
        },
    });

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-run');
  
    // Default task(s).
    //grunt.registerTask('default', ['gitclone:docs']);
    grunt.registerTask('upload-docs', [
        'clean:github_pages',
        'gitclone:github_pages',
        'clean:docs',
        'copy:docs',
        'gitadd:github_pages',
        'gitcommit:github_pages',
        'gitpush:github_pages',
        'clean:github_pages'
    ]);
  
  };