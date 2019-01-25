'use strict';

const Q = require('q');

const compareFunc = require('compare-func');
const emoji = require('commit-emojis').default;
const readFile = Q.denodeify(require('fs').readFile);
const resolve = require('path').resolve;

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

// Commit Types
// ---------------
const MISC_TYPE = 'Miscellaneous';
const mapToHeadline = {
  [emoji.feature]: 'Features',
  [emoji.improvement]: 'Refactoring & Improvements',
  [emoji.fix]: 'Bug Fixes',
  [emoji.test]: 'Tests',
  [emoji.removal]: 'Deprecations',
  [emoji.style]: 'UI Updates',
  [emoji.tooling]: 'Tooling',
  [emoji.docs]: 'Documentation',
};

// Group Order
// ---------------
const order = [...Object.values(mapToHeadline), MISC_TYPE];
const commitGroupsSort = (g1, g2) =>
  order.indexOf(g1.title) - order.indexOf(g2.title);

// Module
// ---------------
module.exports = Q.all([
  readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/footer.hbs'), 'utf-8'),
]).spread((template, header, commit, footer) => {
  const writerOpts = getWriterOpts();

  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;

  return writerOpts;
});

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      // Discard version commits.
      if (commit.type === emoji.tag) {
        return;
      }

      commit.notes.forEach(note => {
        note.title = `BREAKING CHANGES`;
      });

      commit.type = mapToHeadline[commit.type] || MISC_TYPE;
      commit.subject = capitalize(commit.subject);

      if (typeof commit.hash === `string`) {
        commit.hash = commit.hash.substring(0, 7);
      }

      if (context.host) {
        // User URLs.
        commit.subject = commit.subject.replace(
          /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
          (_, username) => {
            if (username.includes('/')) {
              return `@${username}`;
            }

            return `[@${username}](${context.host}/${username})`;
          }
        );
      }

      return commit;
    },
    groupBy: 'type',
    commitGroupsSort,
    noteGroupsSort: 'title',
    notesSort: compareFunc,
  };
}
