const { pour } = require('../lib');

(async () => {
  await pour('git add .')
  await pour('git commit')
})().catch(console.error)
