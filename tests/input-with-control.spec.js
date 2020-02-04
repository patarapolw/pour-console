const { pour } = require('../lib');

(async () => {
  await pour('git add .')
  await pour('git commit', { stdio: 'inherit' })
  await pour('git push origin master')
})().catch(console.error)
