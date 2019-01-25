'use strict';
const conventionalChangelogCore = require('conventional-changelog-core');
const gitDummyCommit = require('git-dummy-commit');
const shell = require('shelljs');
const through = require('through2');

const config = require('../');

beforeAll(function() {
  shell.config.resetForTesting();
  shell.cd(__dirname);
  shell.rm('-rf', 'tmp');
  shell.mkdir('tmp');
  shell.cd('tmp');
  shell.mkdir('git-templates');
  shell.exec('git init --template=./git-templates');

  gitDummyCommit(['🛠  add TravisCI pipeline', 'This is the body!']);
  gitDummyCommit(['✨  amazing new module']);
  gitDummyCommit(['✨  cool new feature']);
  gitDummyCommit(['🔖  v99.99.99']);
  gitDummyCommit(['🌈  make it better', 'BREAKING CHANGE: New API!']);
  gitDummyCommit(['Ooops no emoji!']);
  gitDummyCommit(['🤪  Ooops wrong emoji!']);
});

test('should work if there is no semver tag', function(done) {
  conventionalChangelogCore({
    config: config,
  })
    .on('error', function(err) {
      done(err);
    })
    .pipe(
      through(function(chunk) {
        chunk = chunk.toString();

        expect(chunk).toMatch('### Features');
        expect(chunk).toMatch('### Refactoring & Improvements');
        expect(chunk).toMatch('### Tooling');

        // Capitalize
        expect(chunk).toMatch('Cool new feature');

        expect(chunk).toMatch('### Miscellaneous');
        expect(chunk).toMatch('Ooops wrong emoji!');
        expect(chunk).toMatch('Ooops no emoji!');

        expect(chunk).toMatch('### BREAKING CHANGES');

        expect(chunk).not.toMatch('v99.99.99');
        expect(chunk).not.toMatch('### Version');

        done();
      })
    );
});
