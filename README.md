# conventional-changelog-emojis

[![buid][ci-badge]][ci] [![buid][coverage-badge]][coverage] [![version][version-badge]][package] [![MIT License][license-badge]][license]

Use [emojis](https://github.com/sebald/commit-emojis#available-emojis) in your commit message for fun and profit!

## Emojis Message Convention

The convention is based on [Angular's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

```
<emoji>  <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

You can find the supported emojis and their meaning [here](https://github.com/sebald/commit-emojis/blob/master/README.md#available-emojis).

### Examples

Appears under "Features" header, pencil subheader:

```
✨ add 'graphiteWidth' option
```

Appears under "Bug Fixes" header, graphite subheader, with a link to issue #28:

```
🐛 stop graphite breaking when width < 0.1

Closes #28
```

## Smart Commit Support

This preset supporst mulitple smart commit formats.

### GitHub, Gitlab, Bitbucket, ...

If a smart commit references an issue with the `#` prefix (This is supported by `conventional-changelog` by default) they will be linked in the generated changelog.

### Jira, ...

If a smart commit references an issue with the `ABC-` prefix they will be linked in the generated changelog.

### Different issue tracker URL

If your issue tracker has a different URL than your repository (e.g. your using Bitbucket and track issues in Jira), you can specify this in your `package.json` via the `bugs.url` field.

This preset supports [Jira Smart Commits](https://confluence.atlassian.com/bitbucket/use-smart-commits-298979931.html)

---

_Based on the [`conventional-changelog-angular`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) preset._

<!-- LINKS -->

[ci]: https://travis-ci.org/sebald/conventional-changelog-emojis
[ci-badge]: https://img.shields.io/travis/sebald/conventional-changelog-emojis.svg?style=flat-square
[coverage]: https://codecov.io/gh/sebald/conventional-changelog-emojis
[coverage-badge]: https://img.shields.io/codecov/c/github/sebald/conventional-changelog-emojis.svg?style=flat-square
[license]: https://github.com/sebald/conventional-changelog-emojis/blob/master/LICENCE
[license-badge]: https://img.shields.io/npm/l/conventional-changelog-emojis.svg?style=flat-square
[package]: https://www.npmjs.com/package/conventional-changelog-emojis
[version-badge]: https://img.shields.io/npm/v/conventional-changelog-emojis.svg?style=flat-square
