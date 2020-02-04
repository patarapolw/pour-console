# pour-console

A simplified promise-based `spawn`, with real-time logging to console.

## Usage

```js
const { Pour } = require('pour-console');

(async () => {
  await Pour.pour('git switch non-existing-branch')  // Will terminate at this line due to branch not existing.

  await Pour.pour('git add .')
  await Pour.pour('git commit -m update')
  await Pour.pour('git push origin non-existing-branch')
})().catch(console.error);
```

## Deviation from `spawn`

This project uses [shlex](https://github.com/rgov/node-shlex) to simplify command calling; however you can directly use it without `shlex` by

```js
await Pour.pour([
  'git',
  'commit',
  '-m',
  'long Long commit message'
])
```

As this also inherits `spawn`, you can specify `cwd` by

```js
await Pour.pour('git add .', {
  cwd: './dist'
})
```

## Installation

```sh
yarn add pour-console  # or npm i pour-console
```

## About the name

The name comes from a different package -- [std-pour](https://github.com/JoelBCarter/std-pour), with quite a similar functionality. But this package is enhanced.
