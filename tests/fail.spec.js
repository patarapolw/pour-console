const { pour } = require('../lib');

(async () => {
  await pour('git switch "non-existent branch"')
  await pour('echo "does not reach here"')
})().catch(console.error)
