import { spawn, SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process'
import { split, quote } from 'shlex'

/**
 * ```js
 * const { pour } = require('pour-console')
 * const p = pour('git add .', { cwd: './dist' })
 * // p.process => Original Process
 * // p.then() => When it is resolved
 * // p.catch() => When it is rejected
 * ```
 * 
 * @param cmd Command line string, or array of strings
 * @param options SpawnOptions
 */
export function pour (
  cmd: string | string[], options?: SpawnOptionsWithoutStdio & { isTty?: boolean }
): Promise<void> & { process: ChildProcessWithoutNullStreams } {
  let a0 = ''
  let args = []

  if (typeof cmd === 'string') {
    [a0, ...args] = split(cmd)
  } else {
    [a0, ...args] = cmd
  }

  console.log('\x1B[2;37m', '$', [a0, ...args].map((el) => {
    return quote(el)
  }).join(' '), '\x1B[0m')

  const p = spawn(a0, args, options)

  return new PourPromise((resolve, reject) => {
    // @ts-ignore
    if (options && options.stdio === 'inherit') {
      
    } else {
      process.stdin.pipe(p.stdin)
      p.stdout.on('data', d => console.log(d.toString().trimEnd()))
      p.stderr.on('data', d => console.error(
        '\x1b[31m', 'Error:', '\x1b[0m',
        d.toString().trimEnd()
      ))
    }
    p.on('error', reject)
    p.on('close', code => {
      code !== 0 ? reject(`Non-zero exit code: ${code}`) : resolve()
    })
  }, p)
}

class PourPromise extends Promise<void> {
  process: ChildProcessWithoutNullStreams

  constructor(
    executor: (resolve: (r?: any) => void, reject: (err?: any) => void) => void,
    process: ChildProcessWithoutNullStreams
  ) {
    super(executor)
    this.process = process
  }
}

// function logTo (target: NodeJS.WriteStream, ...segs: any[]) {
//   segs.forEach(s => target.write(s))
// }
