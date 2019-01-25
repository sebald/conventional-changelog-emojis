# conventional-changelog-emojis

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

You can find the supported emojis and their meaning [here](https://github.com/sebald/commit-emojis/blob/master/README.md#available-emojis.

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

---

_Based on the [`conventional-changelog-angular`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) preset._
