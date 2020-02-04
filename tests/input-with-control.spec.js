/**
 * Currently this fails to send control keys. Might need to have a look at pty.js
 */
const { pour } = require('../lib');

(async () => {
  await pour('nano')
})().catch(console.error)
