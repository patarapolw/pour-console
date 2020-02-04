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

  logTo(process.stdout, '\x1B[2;37m', '$ ', [a0, ...args].map((el) => {
    return quote(el)
  }).join(' '), '\x1B[0m', '\n')

  const p = spawn(a0, args, options)

  return new PourPromise((resolve, reject) => {
    // @ts-ignore
    if (options && options.stdio === 'inherit') {
      // ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
      //   process.on(eventType as any, () => {
      //     console.clear()
      //     process.exit()
      //   });
      // })
    } else {
      process.stdin.pipe(p.stdin)
      p.stdout.pipe(process.stdout)
      p.stderr.pipe(process.stderr)
    }

    p.on('error', reject)
    p.on('close', code => code !== 0 ? reject(`Non-zero exit code: ${code}`) : resolve())
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

function logTo (target: NodeJS.WriteStream, ...segs: any[]) {
  segs.forEach(s => target.write(s))
}
