import { spawn, SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process'

export function pour (cmd: string | string[], options?: SpawnOptionsWithoutStdio) {
  let a0 = ''
  let args = []

  if (typeof cmd === 'string') {
    [a0, ...args] = require('shlex').split(cmd)
  } else {
    [a0, ...args] = cmd
  }

  console.log('\x1B[2;37m', [a0, ...args].map((el) => {
    return el.includes(' ') ? `"${el.replace(/"/g, '\\"')}"` : el
  }).join(' '), '\x1B[0m')

  const p = spawn(a0, args, options)

  const promise = new Promise((resolve, reject) => {
    p.stdin.pipe(process.stdin)
    p.stdout.on('data', d => console.log(d.toString().trimEnd()))
    p.stderr.on('data', d => console.error(
      '\x1b[31m', 'Error:', '\x1b[0m',
      d.toString().trimEnd())
    )
    p.on('error', reject)
    p.on('close', code => code !== 0 ? reject(`Non-zero exit code: ${code}`) : resolve())
  }) as Promise<void>

  Object.assign(promise, { process: p })

  return promise as Promise<void> & {
    process: ChildProcessWithoutNullStreams
  }
}
