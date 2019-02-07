'use strict';

/**
 * @type {RegExp}
 */
const emojiRegex = require('emoji-regex/text')();

// Add capture groups to `emoji-regex`
const exp = new RegExp(`^(?:(${emojiRegex.source})\\s+)?(.*)$`);

module.exports = {
  headerPattern: exp,
  headerCorrespondence: [`type`, `subject`],
  issuePrefixes: ['#', '[A-Z]{3}-'],
  noteKeywords: [`BREAKING CHANGE`, `BREAKING CHANGES`],
  revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
  revertCorrespondence: [`header`, `hash`],
};
