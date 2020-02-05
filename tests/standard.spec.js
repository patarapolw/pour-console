const { pour } = require('../lib');

(async () => {
  await pour('echo hello')
})().catch(console.error).then(() => process.exit())
