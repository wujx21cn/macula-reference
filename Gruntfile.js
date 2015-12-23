/*!
 * Macula's Gruntfile
 * http://www.infinitus.com.cn/
 * Copyright (c) 2014 Infinitus, Inc.
 * Licensed under MIT (https://github.com/macula-projects/macula-reference/blob/master/LICENSE-MIT)
 */

module.exports = function(grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        'input': '.',
        'output': '_book',
        'gh-pages': {
            options: {
                base: '_book'
            },
            src: '**/*'
        },
        'shell': {
            options: {
                stderr: false
            },
            target: {
                command: 'gitbook build <%= input %> <%= output %>'
            }
        },
        'clean': {
            files: '_book'
        }
    });
    
    //load grunt plugin task
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-gh-pages');


    grunt.registerTask('docs', ['clean', 'shell', 'gh-pages']);
};
