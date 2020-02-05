const { pour } = require('../lib');

(async () => {
  await pour('git add .')
  await pour('git commit', { stdio: 'inherit' })
  await pour('git push origin master')
  process.stdout.end()
})().catch(console.error)
