import { spawn, SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process'

export class Pour extends Promise<any> {
  static pour (cmd: string | string[], options?: SpawnOptionsWithoutStdio) {
    return new Pour(cmd, options)
  }

  process: ChildProcessWithoutNullStreams

  constructor (cmd: string | string[], options?: SpawnOptionsWithoutStdio) {
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

    super((resolve, reject) => {
      p.stdin.pipe(process.stdin)
      p.stdout.on('data', d => console.log(d.toString().trimEnd()))
      p.stderr.on('data', d => console.error(d.toString().trimEnd()))
      p.on('error', reject)
      p.on('close', resolve)
    })

    this.process = p
  }
}
