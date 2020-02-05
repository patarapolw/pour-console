# pour-console

[![npm version](https://badge.fury.io/js/pour-console.svg)](https://badge.fury.io/js/pour-console)

A simplified promise-based `spawn`, with real-time logging to console.

## Usage

```js
const { pour } = require('pour-console');

(async () => {
  await pour('git switch "non-existent branch"')
  await pour('echo "does not reach here"')  // Will not reach here.
})().catch(console.error)
```

## Deviation from `spawn`

This project uses [shlex](https://github.com/rgov/node-shlex) to simplify command calling; however you can directly use it without `shlex` by

```js
await pour([
  'git',
  'commit',
  '-m',
  'long Long commit message'
])
```

As this also inherits `spawn`, you can specify `cwd` by

```js
await pour('git add .', {
  cwd: './dist'
})
```

## Special apps and apps that need Ctrl key

In this case, you'll need to use the good ol' `stdio: "inherit"`.

```js
await pour('nano file.txt', {
  stdio: 'inherit'
})
```

## Installation

```sh
yarn add pour-console  # or npm i pour-console
```

## About the name

The name comes from a different package -- [std-pour](https://github.com/JoelBCarter/std-pour), with quite a similar functionality. But this package is enhanced.
